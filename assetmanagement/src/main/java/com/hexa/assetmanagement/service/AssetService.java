package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.repository.AssetRepository;

@Service
public class AssetService {
	@Autowired
	private AssetRepository assetRepository;

	Logger logger = LoggerFactory.getLogger("AssetService");

	public Asset addAsset(Asset asset) {
		// if the date is null then setting it with localdate
		if (asset.getDate() == null)
			asset.setDate(LocalDate.now());
		logger.info("Asset added successfully!");
		return assetRepository.save(asset);
	}

	public Asset getById(int assetId) throws InvalidIdException {
		Optional<Asset> op = assetRepository.findById(assetId);
		if (op.isEmpty())
			throw new InvalidIdException("Asset Id is invalid....");
		return op.get();
	}

	public List<Asset> getAll(Pageable pageable) {
		return assetRepository.findAll(pageable).getContent();
	}

	public List<Asset> filterByName(String name) {

		return assetRepository.findByName(name);
	}

	public List<Asset> filterByCategory(String category) {
		return assetRepository.findByCategoryName(category);
	}

	public List<Asset> filterByStatus(String status) {
		return assetRepository.findByStatus(status);
	}

	public Asset updateAsset(Asset newAsset, Asset oldAsset) {

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

		logger.info("Asset " + newAsset.getName() + "updated successfully!");
		return assetRepository.save(oldAsset);
	}

	public String deleteAssetById(Asset asset) {

		logger.info("Asset {} deleted successfully!", asset.getName());
		assetRepository.delete(asset);
		return "Asset deleted successfully";
	}

}
