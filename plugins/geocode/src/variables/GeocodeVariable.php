<?php
/**
 * Geocode plugin for Craft CMS 3.x
 *
 * Field to geocode an address to get coordinates
 *
 * @link      https://hyperakt.com
 * @copyright Copyright (c) 2020 Dylan
 */

namespace sgtpenguin\geocode\variables;

use sgtpenguin\geocode\Geocode;

use Craft;

/**
 * Geocode Variable
 *
 * Craft allows plugins to provide their own template variables, accessible from
 * the {{ craft }} global variable (e.g. {{ craft.geocode }}).
 *
 * https://craftcms.com/docs/plugins/variables
 *
 * @author    Dylan
 * @package   Geocode
 * @since     1.0.0
 */
class GeocodeVariable
{
    // Public Methods
    // =========================================================================

    /**
     * Whatever you want to output to a Twig template can go into a Variable method.
     * You can have as many variable functions as you want.  From any Twig template,
     * call it like this:
     *
     *     {{ craft.geocode.exampleVariable }}
     *
     * Or, if your variable requires parameters from Twig:
     *
     *     {{ craft.geocode.exampleVariable(twigValue) }}
     *
     * @param null $optional
     * @return string
     */
    public function exampleVariable($optional = null)
    {
        $result = "And away we go to the Twig template...";
        if ($optional) {
            $result = "I'm feeling optional today...";
        }
        return $result;
    }
}
