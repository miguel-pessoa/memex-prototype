package com.memex.service.dto;

import java.time.Instant;
import javax.persistence.Column;
import javax.validation.constraints.Size;

public class JourneyDTO extends BaseCreateUpdateDTO {

    @Size(max = 255)
    private String title;

    @Size(max = 2000)
    private String description;

    @Size(max = 2000)
    private String storiesIds;

    @Size(max = 20000)
    private String coverImage;

    private Boolean ordered;

    private Long color;

    private Long progress;

    private Instant createdDate;

    private Instant updatedDate;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setStoriesIds(String storiesIds) {
        this.storiesIds = storiesIds;
    }

    public String getStoriesIds() {
        return storiesIds;
    }

    public void setProgress(Long progress) {
        this.progress = progress;
    }

    public Long getProgress() {
        return progress;
    }

    public void setOrdered(Boolean ordered) {
        this.ordered = ordered;
    }

    public Boolean getOrdered() {
        return ordered;
    }

    public void setColor(Long color) {
        this.color = color;
    }

    public Long getColor() {
        return color;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setUpdatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Instant getUpdatedDate() {
        return updatedDate;
    }
}
