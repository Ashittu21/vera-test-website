<?php

namespace sgtpenguin\specialrelations\assetbundles\specialrelations;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class SpecialRelationsAsset extends AssetBundle
{
    public function init()
    {
        // define the path that your publishable resources live
        $this->sourcePath = '@sgtpenguin/specialrelations/assetbundles/specialrelations/dist';

        // define the dependencies
        $this->depends = [
            CpAsset::class,
        ];

        // define the relative path to CSS/JS files that should be registered with the page
        // when this asset bundle is registered
        $this->js = [
            'script.js',
        ];

        $this->css = [
            'styles.css',
        ];

        parent::init();
    }
}