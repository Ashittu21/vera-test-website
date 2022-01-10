<?php

namespace craft\contentmigrations;

use Craft;
use craft\db\Migration;
use craft\db\Query;

/**
 * m201209_152522_focuspoint migration.
 */
class m201209_152522_focuspoint extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        // Place migration code here...
        $focalPointField = 'field_focalPoint';

		// Get all existing Craft 2 focal point field data we are interested in
	    $focalPoints = (new Query())
		    ->select(['elementId', 'title', $focalPointField])
		    ->from('{{%content}}')
		    ->andWhere(['not', [$focalPointField => null, $focalPointField => '50% 50%']])
		    ->all();
	    
	    foreach($focalPoints as $row) {
		    // Craft 2 Focal Point field data will be in the format of: x% y% e.g. 63.29% 36.37%
		    $oldFocalPoint = explode(' ', str_replace('%','', $row[$focalPointField]));
		    // Craft 3 Focal Point field data needs to be in the format of: x;y as decimal e.g. 0.5035;0.446
		    $newFocalPoint = $oldFocalPoint[0] / 100 . ';' . $oldFocalPoint[1] / 100;

		    // Update the assets table
		    $this->update('{{%assets}}', [
			    'focalPoint' => $newFocalPoint,
		    ], ['id' => $row['elementId']]);
	    }
	    
	    return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m201209_152522_focuspoint cannot be reverted.\n";
        return false;
    }
}
