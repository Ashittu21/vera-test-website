<?php
namespace sgtpenguin\geocode\models;

use craft\base\Model;

class Settings extends Model
{
    public $googleApiKey = '';

    public function rules()
    {
        return [
            [['googleApiKey'], 'required'],
            // ...
        ];
    }
}