<?php

namespace Craft;

class Fam_ChildrenFieldType extends BaseElementFieldType
{

	protected $elementType = 'Entry';

	protected $inputTemplate = 'fam/templates/elementSelect';

	private $relatedSections = [];

	public $relatedIds = [];

	public $norelations = false;

	public function getChildren()
	{

		$this->norelations = false;


		if (in_array($this->element->classHandle, ['MatrixBlock','Neo_Block'])) {
			$elementId = $this->element->ownerId;
			$criteria = craft()->elements->getCriteria(ElementType::Entry);
			$criteria->id = $elementId;
			$element = $criteria->first();
		} else {
			$element = $this->element;
		}

		if ($element && $element->classHandle === 'Entry' && $element->section->type === 'structure') {
			$children = $element->getChildren()->ids();
		} else {
			$children = null;
		}

		if (!$children || sizeof($children) === 0) {
			$this->norelations = true;
			return;
		}

		$this->relatedIds = $children;

		$this->relatedSections = craft()->fam->getSectionIds($children);
	}

	public function getName()
	{
		return Craft::t('Children (Fam)');
	}

    public function getInputTemplateVariables($name, $criteria)
    {
	    $this->getChildren();

        $variables = parent::getInputTemplateVariables($name, $criteria);

        if ($this->norelations) {
			$variables['noRelations'] = true;
	    }

		$variables['criteria']['id'] = $this->relatedIds;

		$variables['sources'] = $this->relatedSections;

        return $variables;
    }

    public function getInputHtml($name, $criteria)
	{
		$variables = $this->getInputTemplateVariables($name, $criteria);

		if ($this->norelations) {

			$id = craft()->templates->formatInputId($name);

			$namespacedId = craft()->templates->namespaceInputId($id);

			craft()->templates->includeJs("$('#{$namespacedId} .btn.add').addClass('is-disabled');
			$('#{$namespacedId}-field .heading').after('<p>No Children!</p>')");

		}

		return craft()->templates->render('fam/fields/elementSelect',$variables);;
	}

}
