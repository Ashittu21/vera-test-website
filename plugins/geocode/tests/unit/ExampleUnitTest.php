<?php
/**
 * Geocode plugin for Craft CMS 3.x
 *
 * Field to geocode an address to get coordinates
 *
 * @link      https://hyperakt.com
 * @copyright Copyright (c) 2020 Dylan
 */

namespace sgtpenguin\geocodetests\unit;

use Codeception\Test\Unit;
use UnitTester;
use Craft;
use sgtpenguin\geocode\Geocode;

/**
 * ExampleUnitTest
 *
 *
 * @author    Dylan
 * @package   Geocode
 * @since     1.0.0
 */
class ExampleUnitTest extends Unit
{
    // Properties
    // =========================================================================

    /**
     * @var UnitTester
     */
    protected $tester;

    // Public methods
    // =========================================================================

    // Tests
    // =========================================================================

    /**
     *
     */
    public function testPluginInstance()
    {
        $this->assertInstanceOf(
            Geocode::class,
            Geocode::$plugin
        );
    }

    /**
     *
     */
    public function testCraftEdition()
    {
        Craft::$app->setEdition(Craft::Pro);

        $this->assertSame(
            Craft::Pro,
            Craft::$app->getEdition()
        );
    }
}
