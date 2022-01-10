<?php
namespace Craft;
use Craft;
use craft\elements\Entry;

return [
  'endpoints' => [
    'gallerynav/<id:\d+>.json' => function($id) {
      Craft::$app->getResponse()->getHeaders()->set('Access-Control-Allow-Origin', '*');
      return [
        'elementType' => 'craft\elements\Entry',
        'criteria' => [
          'section' => 'mediaExhibit',
          'id' => $id
        ],
        'one' => true,
        'transformer' => function($entry) {
          $blocks = $entry->galleryBuilder->level(1)->find();
          return [
            'heading' => $entry->heading,
            'anchors' => mapAnchors($blocks)
          ];
        }
      ];
    },
    'gallery/<id:\d+>.json' => function($id) {
      Craft::$app->getResponse()->getHeaders()->set('Access-Control-Allow-Origin', '*');
      return [
        'elementType' => Entry::class,
        'criteria' => [
          'section' => 'mediaExhibit',
          'id' => $id
        ],
        'one' => true,
        'transformer' => function($entry) {
          $blocks = $entry->galleryBuilder->level(1)->find();
          return [
            'title' => $entry->title,
            'heading' => $entry->heading,
            'subheading' => $entry->subheading,
            'explainer' => $entry->explainer,
            'videoUrl' => count($entry->heroVideoAmbient) ? $entry->heroVideoAmbient[0]->url : null,
            'children' => mapExhibits($entry->children->find()),
            'anchors' => mapAnchors($blocks),
            'blocks' => mapGallery($blocks)
          ];
        }
      ];
    },
    'exhibit/<slug:{slug}>.json' => function($slug) {
      Craft::$app->getResponse()->getHeaders()->set('Access-Control-Allow-Origin', '*');
      return [
        'elementType' => Entry::class,
        'criteria' => [
          'section' => 'mediaExhibit',
          'slug' => $slug
        ],
        'one' => true,
        'transformer' => function($entry) {
          return [
            'title' => $entry->title,
            'subtitle' => $entry->jobTitle,
            'explainer' => $entry->explainer,
            'items' => array_map(function($item) {
                switch ($item->type->handle) {
                    case 'video':
                      return [
                        'component' => 'Video',
                        'id' => $item->id,
                        'videoId' => $item->video->id,
                        'service' => $item->video->gatewayHandle
                      ];

                    case 'text':
                      return [
                        'component' => 'Text',
                        'id' => $item->id,
                        'text' => (string)$item->text
                      ];

                    case 'image':
                      return [
                        'component' => 'Image',
                        'id' => $item->id,
                        'images' => getImages($item->images->find()),
                        'caption' => $item->caption
                      ];

                    case 'audio':
                      return [
                        'component' => 'Audio',
                        'id' => $item->id,
                        'audioUrl' => $item->audioClip[0]->url,
                        'images' => getImages($item->images->find())
                      ];

                    case 'quote':
                      return [
                        'component' => 'Quote',
                        'id' => $item->id,
                        'text' => $item->plaintext
                      ];

                    default:
                      return "Unknown block type";
                }
              return $item->type->handle;
            }, $entry->exhibitBuilder->level(1)->find()),
            'siblings' => mapExhibits($entry->parent->children->find())
          ];
        }
      ];
    }
  ]
];


function mapAnchors($blocks) {
  $mapped = array_map(function($block) {
    return $block->anchor;
  }, $blocks);
  return array_values(array_filter($mapped, function($a) {
    return $a != null;
  }));
}
function mapGallery($blocks) {
  return array_map(function($block) {
    switch ($block->type->handle) {
      case 'textSection':
        return [
          'id' => $block->id,
          'anchor' => $block->anchor,
          'component' => 'TextSection',
          'backgroundImage' => count($block->heroImage) ? $block->heroImage[0]->url : null,
          'blocks' => mapGalleryBlocks($block->children->level(2)->find())
        ];
      case 'grid';
        return [
          'id' => $block->id,
          'anchor' => $block->anchor,
          'component' => 'Grid'
        ];
    }
  }, $blocks);
}
function mapGalleryBlocks($blocks) {
  return array_map(function($block) {
    switch ($block->type->handle) {
      case 'text':
        return [
          'id' => $block->id,
          'component' => 'Text',
          'text' => (string)$block->text
        ];

      case 'heading':
        return [
          'id' => $block->id,
          'component' => 'Heading',
          'text' => (string)$block->richHeading
        ];

      case 'ctas':
        return [
          'id' => $block->id,
          'component' => 'Ctas',
          'blocks' => mapCtas($block->children->find())
        ];
      case 'list':
        return [
          'id' => $block->id,
          'component' => 'List',
          'blocks' => mapList($block->children->find())
        ];
    }
  }, $blocks);
}
function mapList($blocks) {
  return array_map(function($block) {
    switch ($block->type->handle) {
      case 'listItem':
        return [
          'id' => $block->id,
          'component' => 'ListItem',
          'blocks' => array_map(function($block) {
              switch ($block->type->handle) {
                case 'heading':
                  return [
                    'id' => $block->id,
                    'component' => 'Heading',
                    'text' => (string)$block->richHeading
                  ];

                case 'text':
                  return [
                    'id' => $block->id,
                    'component' => 'Text',
                    'text' => (string)$block->text
                  ];
              }
            }, $block->children->find())
          ];
      case 'heading':
        return [
          'id' => $block->id,
          'component' => 'Heading',
          'text' => (string)$block->richHeading
        ];
    }
  }, $blocks);
}

function mapCtas($blocks) {
  return array_map(function($block) {
    switch ($block->type->handle) {
      case 'linkOut':
        return [
          'id' => $block->id,
          'component' => 'LinkOut',
          'url' => $block->linkUrl,
          'text' => $block->heading
        ];

      case 'video':
        return [
          'id' => $block->id,
          'component' => 'VideoModal',
          'videoId' => $block->video->id,
          'service' => $block->video->gatewayHandle,
          'text' => $block->heading
        ];
    }
  }, $blocks);
}
function mapExhibits($exhibits) {
  return array_map(function($exhibit) {
    switch ($exhibit->type->handle) {
      case 'exhibit':
        return [
          'id' => $exhibit->id,
          'type' => $exhibit->type->handle,
          'slug' => $exhibit->slug,
          'title' => $exhibit->title,
          'subtitle' => $exhibit->jobTitle,
          'image' => count($exhibit->images) ? $exhibit->images[0]->url : null
        ];
      case 'fillTile':
        return [
          'id' => $exhibit->id,
          'type' => $exhibit->type->handle,
          'text' => $exhibit->title,
          'colorCombo' => $exhibit->colorCombo->value
        ];
    }
  }, $exhibits);
}
function getImages($images) {
    return array_map(function($image) {
        return [
            'url' => $image->url,
            'title' => $image->title
        ];
    }, $images);
}
