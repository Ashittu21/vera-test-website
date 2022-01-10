<?php

namespace Craft;

class Fam_RelatedToMeFieldType extends BaseElementFieldType
{
	
	protected $elementType = 'Entry';
	
	protected $inputTemplate = 'fam/templates/elementSelect';
		
	public $relatedSections = [];
	
	public $relatedIds = [];
	
	public $norelations = false;

	public function getRelations() {
		
		$targetField = $this->getSettings()->relationField;
		
		$search_sections = [];
		$sources = $this->getSettings()->sources;
		
		foreach ($sources as $source) {
			if (strpos($source, 'section:') !== false) {
				$section = craft()->sections->getSectionById(str_replace('section:', '', $source));
				array_push($search_sections,$section->handle);
			}
    }
    		
		$criteria = craft()->elements->getCriteria(ElementType::Entry);
		$criteria->section = $search_sections;
		$criteria->relatedTo = [
			'targetElement' => $this->element,
			'field' => $targetField
		];
		$criteria->limit = null;
		
		if ($criteria->count() == 0) {
			$this->norelations = true;
		}
		
		//Get Sections
		$relations = $criteria->find();
		
		//Set Sections
		$this->relatedSections = craft()->fam->getSectionIds($relations);
		
		//Get Ids
		$this->relatedIds = $criteria->ids();
	}

	public function getFieldOptions()
	{
		$fields = craft()->fields->allFields;
		
		$options = [['label'=>null,'value'=>null,'disabled'=>true]];
		
		foreach ($fields as $field) {
			$field_components = ['label'=>$field->name,'value'=>$field->id];
			array_push($options,$field_components);
		}
		
		return $options;

	}
	
	public function getName()
	{
		return Craft::t('Related To Me (Fam)');
	}
	
	public function defineSettings()
    {
        $settings = parent::defineSettings();

        $settings['relationField'] = array(AttributeType::Mixed, 'default' => '');

        return $settings;
    }

	public function getSettingsHtml()
    {
        $settingsHtml = parent::getSettingsHtml();

        return $settingsHtml . craft()->templates->render('fam/fields/settings', array(
            'settings' => $this->getSettings(),
            'fields' => $this->getFieldOptions(),
            'type' => $this->getName(),
            'value' => $this->getSettings()->relationField
        ));;

    }
    
    public function getInputTemplateVariables($name, $criteria)
    {   
	    $this->getRelations();
	    
        $variables = parent::getInputTemplateVariables($name, $criteria);
        
        if ($this->norelations) {
			$variables['noRelations'] = true;
	    }
				
		$variables['criteria']['id'] = $this->relatedIds;
		
		// $variables['sources'] = $this->relatedSections;

        return $variables;
    }
    
    public function getInputHtml($name, $criteria)
	{
		$variables = $this->getInputTemplateVariables($name, $criteria);
		
		if ($this->norelations) {
		
			$id = craft()->templates->formatInputId($name);
			
			$namespacedId = craft()->templates->namespaceInputId($id);
			
			craft()->templates->includeJs("$('#{$namespacedId} .btn.add').addClass('is-disabled'); $('#{$namespacedId}').prepend($('<p>No relations!</p>'));");

		}

		return craft()->templates->render('fam/fields/elementSelect',$variables);;
	}

}
