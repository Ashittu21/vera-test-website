<?php
/**
 * Geocode plugin for Craft CMS 3.x
 *
 * Field to geocode an address to get coordinates
 *
 * @link      https://hyperakt.com
 * @copyright Copyright (c) 2020 Dylan
 */

namespace sgtpenguin\geocode\services;

use sgtpenguin\geocode\Geocode;

use Craft;
use craft\base\Component;

/**
 * GeocodeService Service
 *
 * All of your plugin’s business logic should go in services, including saving data,
 * retrieving data, etc. They provide APIs that your controllers, template variables,
 * and other plugins can interact with.
 *
 * https://craftcms.com/docs/plugins/services
 *
 * @author    Dylan
 * @package   Geocode
 * @since     1.0.0
 */
class GeocodeService extends Component
{
    // Public Methods
    // =========================================================================

    /**
     * This function can literally be anything you want, and you can have as many service
     * functions as you want
     *
     * From any other plugin file, call it like this:
     *
     *     Geocode::$plugin->geocodeService->exampleService()
     *
     * @return mixed
     */
    public function exampleService()
    {
        $result = 'something';

        return $result;
    }
}
