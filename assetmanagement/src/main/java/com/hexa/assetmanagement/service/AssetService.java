package com.hexa.assetmanagement.service;

import java.util.List;
import java.util.Optional;

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

	public Asset addAsset(Asset asset) {
		return assetRepository.save(asset);
	}

	public Asset getById(int id) throws InvalidIdException {
		Optional<Asset> op=assetRepository.findById(id);
		if(op.isEmpty())
			throw new InvalidIdException("Asset Id is invalid....");
		return op.get();
	}

	public List<Asset> getAll(Pageable pageable) {
		return assetRepository.findAll(pageable).getContent();
	}

}
