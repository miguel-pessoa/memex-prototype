package com.memex.domain;

import java.time.Instant;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The Journey entity.
 */
@Entity
@Table(name = "journey")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Journey extends BaseDomain {

    private static final long serialVersionUID = 1L;

    @Size(max = 255)
    @Column(name = "title", length = 255)
    private String title;

    @Size(max = 2000)
    @Column(name = "description", length = 2000)
    private String description;

    @Size(max = 2000)
    @Column(name = "storys_ids", length = 2000)
    private String storiesIds;

    @Column(name = "cover_image")
    private String coverImage;

    @Column(name = "published")
    private Boolean ordered;

    @Column(name = "color")
    private Long color;

    @Column(name = "progress")
    private Long progress;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "updated_date")
    private Instant updatedDate;

    @Size(max = 255)
    @Column(name = "author", length = 255)
    private String author;

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthor() {
        return author;
    }

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
