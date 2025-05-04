package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.Category;
import com.hexa.assetmanagement.repository.AssetRepository;

@Service
public class AssetService {
	@Autowired
	private AssetRepository assetRepository;
	@Autowired
	private CategoryService categoryService;

	Logger logger = LoggerFactory.getLogger("AssetService");

	/*
	 * adding an asset if the asset date is not given set it to the current date.
	 */
	public Asset addAsset(Asset asset) {
		// if the date is null then setting it with localdate
		if (asset.getDate() == null)
			asset.setDate(LocalDate.now());
		logger.info("Asset added successfully!");
		return assetRepository.save(asset);
	}

	/*
	 * filtering an asset by it's id check whether the id is valid or not then
	 * proceed
	 */
	public Asset getById(int assetId) throws InvalidIdException {
		// check if the asset is present or not.
		Optional<Asset> op = assetRepository.findById(assetId);
		// if not throw an exception.
		if (op.isEmpty())
			throw new InvalidIdException("Asset Id is invalid....");
		return op.get();
	}

	/*
	 * return all the assets as the page of assets
	 */
	public Page<Asset> getAll(Pageable pageable) {
		// returning the lists of assets.
		return assetRepository.findAll(pageable);
	}

	/*
	 * returning the list of assets filtered by their name
	 */
	public List<Asset> filterByName(String name) {
		return assetRepository.findByName(name);
	}

	/*
	 * returning the list of assets based on its category as a page of asset
	 */
	public Page<Asset> filterByCategory(String category, Pageable pageable) {
		// returning the lists of assets found through it's category.
		return assetRepository.findByCategoryName(category, pageable);
	}

	/*
	 * returning the list of assets based on the status of an asset
	 */
	public List<Asset> filterByStatus(String status) {
		// returning the lists of assets found through it's status.
		return assetRepository.findByStatus(status);
	}

	/*
	 * updating an asset with checking the new asset constraints, if it is not null
	 * then update it to the old asset reference at last save the old asset
	 * reference.
	 */
	public Asset updateAsset(Asset newAsset, Asset oldAsset) throws InvalidIdException {

		// check whether the name is not null and update
		if (newAsset.getName() != null)
			oldAsset.setName(newAsset.getName());

		// check whether the model is not null and update
		if (newAsset.getModel() != null)
			oldAsset.setModel(newAsset.getModel());

		// check whether the status is not null and update
		if (newAsset.getStatus() != null)
			oldAsset.setStatus(newAsset.getStatus());

		// check whether the date is not null and update
		if (newAsset.getDate() != null)
			oldAsset.setDate(newAsset.getDate());

		// check whether the configuration is not null and update
		if (newAsset.getConfiguration() != null)
			oldAsset.setConfiguration(newAsset.getConfiguration());

		// check whether the description is not null and update
		if (newAsset.getDescription() != null)
			oldAsset.setDescription(newAsset.getDescription());

		// check whether the quantity is not null and update
		if (newAsset.getQuantity() != 0)
			oldAsset.setQuantity(newAsset.getQuantity());
		// check whether the category is changed
		if (newAsset.getCategory() != null) {
			Category cat = categoryService.getById(newAsset.getCategory().getId());
			oldAsset.setCategory(cat);
		}
		logger.info("Asset " + newAsset.getName() + "updated successfully!");
		return assetRepository.save(oldAsset);
	}

	/*
	 * deleting an asset with its id, here it is passed as an asset reference and
	 * deleting it .
	 */
	public String deleteAssetById(Asset asset) {
		// delete an asset with it's id.
		logger.info("Asset {} deleted successfully!", asset.getName());
		assetRepository.delete(asset);
		return "Asset deleted successfully";
	}

}
