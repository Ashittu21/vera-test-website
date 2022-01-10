<?php
/**
 * Special Relations plugin for Craft CMS 3.x
 *
 * A set of entries fields with special characteristics
 *
 * @link      https://hyperakt.com
 * @copyright Copyright (c) 2020 Dylan
 */

namespace \specialrelationstests\unit;

use Codeception\Test\Unit;
use UnitTester;
use Craft;
use \specialrelations\SpecialRelations;

/**
 * ExampleUnitTest
 *
 *
 * @author    Dylan
 * @package   SpecialRelations
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
            SpecialRelations::class,
            SpecialRelations::$plugin
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
