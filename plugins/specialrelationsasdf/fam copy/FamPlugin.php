<?php
namespace Craft;

class FamPlugin extends BasePlugin
{
    function getName()
    {
        return Craft::t('Fam');
    }

    function getVersion()
    {
        return '1.0';
    }

    function getDeveloper()
    {
        return 'Dylan Viola';
    }

    function getDeveloperUrl()
    {
        return 'https://moonpulp.com';
    }
}
