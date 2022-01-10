<?php
/**
 * shortcodes module for Craft CMS 3.x
 *
 * Implementing shortcodes for the Vera site
 *
 * @link      https://hyperakt.com
 * @copyright Copyright (c) 2020 Hyperakt
 */

namespace modules\shortcodesmodule;

use modules\shortcodesmodule\assetbundles\shortcodesmodule\ShortcodesModuleAsset;

use Craft;
use craft\events\RegisterTemplateRootsEvent;
use craft\events\TemplateEvent;
use craft\i18n\PhpMessageSource;
use craft\web\View;

use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module;

/**
 * Craft plugins are very much like little applications in and of themselves. We’ve made
 * it as simple as we can, but the training wheels are off. A little prior knowledge is
 * going to be required to write a plugin.
 *
 * For the purposes of the plugin docs, we’re going to assume that you know PHP and SQL,
 * as well as some semi-advanced concepts like object-oriented programming and PHP namespaces.
 *
 * https://craftcms.com/docs/plugins/introduction
 *
 * @author    Hyperakt
 * @package   ShortcodesModule
 * @since     1.0.0
 *
 */
class ShortcodesModule extends Module
{
    // Static Properties
    // =========================================================================

    /**
     * Static property that is an instance of this module class so that it can be accessed via
     * ShortcodesModule::$instance
     *
     * @var ShortcodesModule
     */
    public static $instance;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@modules/shortcodesmodule', $this->getBasePath());
        $this->controllerNamespace = 'modules\shortcodesmodule\controllers';

        // Translation category
        $i18n = Craft::$app->getI18n();
        /** @noinspection UnSafeIsSetOverArrayInspection */
        if (!isset($i18n->translations[$id]) && !isset($i18n->translations[$id.'*'])) {
            $i18n->translations[$id] = [
                'class' => PhpMessageSource::class,
                'sourceLanguage' => 'en-US',
                'basePath' => '@modules/shortcodesmodule/translations',
                'forceTranslation' => true,
                'allowOverrides' => true,
            ];
        }

        // Base template directory
        Event::on(View::class, View::EVENT_REGISTER_CP_TEMPLATE_ROOTS, function (RegisterTemplateRootsEvent $e) {
            if (is_dir($baseDir = $this->getBasePath().DIRECTORY_SEPARATOR.'templates')) {
                $e->roots[$this->id] = $baseDir;
            }
        });

        // Set this as the global instance of this module class
        static::setInstance($this);

        parent::__construct($id, $parent, $config);
    }

    /**
     * Set our $instance static property to this class so that it can be accessed via
     * ShortcodesModule::$instance
     *
     * Called after the module class is instantiated; do any one-time initialization
     * here such as hooks and events.
     *
     * If you have a '/vendor/autoload.php' file, it will be loaded for you automatically;
     * you do not need to load it in your init() method.
     *
     */
    public function init()
    {
        parent::init();
        self::$instance = $this;

        // Load our AssetBundle
        //if (Craft::$app->getRequest()->getIsCpRequest()) {
            Event::on(
                View::class,
                View::EVENT_BEFORE_RENDER_TEMPLATE,
                function (TemplateEvent $event) {
                    try {
                        Craft::$app->getView()->registerAssetBundle(ShortcodesModuleAsset::class);
                    } catch (InvalidConfigException $e) {
                        Craft::error(
                            'Error registering AssetBundle - '.$e->getMessage(),
                            __METHOD__
                        );
                    }
                }
            );
        //}
 
/**
 * Logging in Craft involves using one of the following methods:
 *
 * Craft::trace(): record a message to trace how a piece of code runs. This is mainly for development use.
 * Craft::info(): record a message that conveys some useful information.
 * Craft::warning(): record a warning message that indicates something unexpected has happened.
 * Craft::error(): record a fatal error that should be investigated as soon as possible.
 *
 * Unless `devMode` is on, only Craft::warning() & Craft::error() will log to `craft/storage/logs/web.log`
 *
 * It's recommended that you pass in the magic constant `__METHOD__` as the second parameter, which sets
 * the category to the method (prefixed with the fully qualified class name) where the constant appears.
 *
 * To enable the Yii debug toolbar, go to your user account in the AdminCP and check the
 * [] Show the debug toolbar on the front end & [] Show the debug toolbar on the Control Panel
 *
 * http://www.yiiframework.com/doc-2.0/guide-runtime-logging.html
 */
        Craft::info(
            Craft::t(
                'shortcodes-module',
                '{name} module loaded',
                ['name' => 'shortcodes']
            ),
            __METHOD__
        );
    }

    /**
	 * Use this method in any plugin to register shortcodes.
	 *
	 * You may register a single callback:
	 *
	 *    return array($this, 'myTag');
	 *
	 * Or you may register an array of callbacks:
	 *
	 *     return array(
	 *         array($this, 'myTag'),
	 *         array($this, 'myOtherTag'),
	 *         array($that_object, 'thatTag'),
	 *     );
	 *
	 * The shortcode tag name will match the method name.
	 *
	 *     eg. `[doubleRainbow]` will render the output of the `doubleRainbow()`
	 *     method on this class if registered as `array($this, 'doubleRainbow')`
	 *
	 * @return array A single array representation of a callable method, or an array of them.
	 */
	public function registerShortcodes()
	{
		return [
			[$this, 'footnote'],
			[$this, 'term'],
			[$this, 'more']
		];
	}

	/**
	 * An example shortcode callback method.
	 *
	 * Examples:
	 *
	 *     Single:     [doubleRainbow]
	 *     Pair:       [doubleRainbow]Text wrapped by shortcode[/doubleRainbow]
	 *     Attributes: [doubleRainbow foo="bar"]
	 *
	 * @param  array $attributes  Key/value pairs of shortcode attributes
	 * @param  string $content    The content between shortcode pairs
	 * @param  string $tag        The tag name. Same as the method name.
	 * @return string             Replacement text.
	 */
	 
	public function footnote($attributes, $content, $tag)
	{
		$uniqid = uniqid();

		return '<span class="footnote"><a href="javascript:void(0)" class="tooltip" data-tooltip-content="#tt-' . $uniqid . '"><i class="footnote__num"></i></a><span class="tt-template"><span id="tt-' . $uniqid . '">' . $content . '</span></span></span>';
	}

	public function term($attributes, $content, $tag)
	{

		$criteria = craft()->elements->getCriteria(ElementType::Category);
		$criteria->group = 'terms';
		$criteria->title = $content;
		$result = $criteria->first();

		if ($result) {
			$definition = $result->definition;

			return '<span class="term" data-definition="' . htmlspecialchars($definition) . '">' . $content . '</span>';

		} else {
			return 'Problem with term!!';
		}

	}

	public function more($attributes, $content, $tag)
	{
		$id = uniqid();
		return '<div class="more"><div class="more-content">' . $content . '</div><label class="more-toggle-label" for="' . $id . '"><button id="' . $id . '" class="more-toggle"><img src="/dist/icons/more.svg"></button>Read More</label></div>';
	}

    // Protected Methods
    // =========================================================================
}
