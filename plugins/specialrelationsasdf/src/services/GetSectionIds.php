<?php
/**
 * Special Relations plugin for Craft CMS 3.x
 *
 * A set of entries fields with special characteristics
 *
 * @link      https://hyperakt.com
 * @copyright Copyright (c) 2020 Dylan
 */

namespace \specialrelations\services;

use \specialrelations\SpecialRelations;

use Craft;
use craft\base\Component;

/**
 * GetSectionIds Service
 *
 * All of your plugin’s business logic should go in services, including saving data,
 * retrieving data, etc. They provide APIs that your controllers, template variables,
 * and other plugins can interact with.
 *
 * https://craftcms.com/docs/plugins/services
 *
 * @author    Dylan
 * @package   SpecialRelations
 * @since     1.0.0
 */
class helpers extends Component
{
    // Public Methods
    // =========================================================================

    /**
     * This function can literally be anything you want, and you can have as many service
     * functions as you want
     *
     * From any other plugin file, call it like this:
     *
     *     SpecialRelations::$plugin->helpers->exampleService()
     *
     * @return mixed
     */
    public function getSectionIds($relationIds) {
      $sections = [];
      
      $criteria = craft()->elements->getCriteria(ElementType::Entry);
      $criteria->id = $relationIds;
      $relations = $criteria->find();
      
      if (count($relations)) {
        foreach ($relations as $relation) {
          if (!in_array($relation->section->id, $sections)) {
            array_push($sections,'section:'.$relation->section->id);
          }
        }
      }
      
      return $sections;
    }	
}
