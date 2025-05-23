package com.hexa.assetmanagement.dto;

import java.util.List;

import org.springframework.stereotype.Component;

import com.hexa.assetmanagement.model.LiquidAsset;

@Component
public class LiquidAssetDto {

	private List<LiquidAsset> list;
	private int totalPages;
	private int currentPage;
	private int totalElements;
	private int size;
	public List<LiquidAsset> getList() {
		return list;
	}
	public void setList(List<LiquidAsset> list) {
		this.list = list;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getTotalElements() {
		return totalElements;
	}
	public void setTotalElements(int totalElements) {
		this.totalElements = totalElements;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	
	
}
