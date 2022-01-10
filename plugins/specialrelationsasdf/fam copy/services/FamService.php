<?php
namespace Craft;

class FamService extends BaseApplicationComponent
{

	public function getSectionIds($relationIds) {
		$sections = [];
		
		$criteria = craft()->elements->getCriteria(ElementType::Entry);
		$criteria->id = $relationIds;
		$relations = $criteria->find();
		
		if (count($relations)) {
			foreach ($relations as $relation) {
				if (!in_array($relation->section->id, $sections)) {
					array_push($sections,'section:'.$relation->section->id);
				}
			}
		}
		
		return $sections;
	}	

}