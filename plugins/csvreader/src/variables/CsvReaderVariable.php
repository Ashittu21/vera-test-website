<?php
/**
 * CSV Reader plugin for Craft CMS 3.x
 *
 * Read csv files in twig
 *
 * @link      https://hyperakt.com
 * @copyright Copyright (c) 2020 Dylan
 */

namespace sgtpenguin\csvreader\variables;

use sgtpenguin\csvreader\CsvReader;

use Craft;

/**
 * CSV Reader Variable
 *
 * Craft allows plugins to provide their own template variables, accessible from
 * the {{ craft }} global variable (e.g. {{ craft.csvReader }}).
 *
 * https://craftcms.com/docs/plugins/variables
 *
 * @author    Dylan
 * @package   CsvReader
 * @since     1.0.0
 */
class CsvReaderVariable
{
    // Public Methods
    // =========================================================================

    /**
     * Whatever you want to output to a Twig template can go into a Variable method.
     * You can have as many variable functions as you want.  From any Twig template,
     * call it like this:
     *
     *     {{ craft.csvReader.exampleVariable }}
     *
     * Or, if your variable requires parameters from Twig:
     *
     *     {{ craft.csvReader.exampleVariable(twigValue) }}
     *
     * @param null $optional
     * @return string
     */
    public function get($url)
	{
		$file = fopen($url,"r");
		$csv = [];
		
		while(! feof($file))
		{
		  $csv[] = fgetcsv($file);
		}
		
		fclose($file);
		
		return $csv;
	}
}
