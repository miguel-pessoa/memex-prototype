package com.memex.service.dto;

import java.time.Instant;
import javax.persistence.Column;
import javax.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public class StoryDTO extends BaseCreateUpdateDTO {

    @Size(max = 255)
    private String title;

    @Size(max = 255)
    private String location;

    @Size(max = 2000)
    private String description;

    private String coverImage;

    private String addCoverImage1;

    private String addCoverImage2;

    private String addCoverImage3;

    private String addCoverImage4;

    private String addCoverImage5;

    private String addCoverImage6;

    private String addCoverImage7;

    private String addCoverImage8;

    private String addCoverImage9;

    private String addCoverImage10;

    @Size(max = 255)
    private String author;

    @Size(max = 255)
    private String coAuthors;

    @Size(max = 255)
    private String coAuthorsApproved;

    private Boolean published;

    @Size(max = 2000)
    private String tags;

    private Long progress;

    private Instant createdDate;

    private Instant updatedDate;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLocation() {
        return location;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getTags() {
        return tags;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setCoAuthors(String coAuthors) {
        this.coAuthors = coAuthors;
    }

    public String getCoAuthors() {
        return coAuthors;
    }

    public void setCoAuthorsApproved(String coAuthorsApproved) {
        this.coAuthorsApproved = coAuthorsApproved;
    }

    public String getCoAuthorsApproved() {
        return coAuthorsApproved;
    }

    public void setProgress(Long progress) {
        this.progress = progress;
    }

    public Long getProgress() {
        return progress;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Boolean getPublished() {
        return published;
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

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setAddCoverImage1(String coverImage1) {
        this.addCoverImage1 = coverImage1;
    }

    public String getAddCoverImage1() {
        return addCoverImage1;
    }

    public void setAddCoverImage2(String coverImage2) {
        this.addCoverImage2 = coverImage2;
    }

    public String getAddCoverImage2() {
        return addCoverImage2;
    }

    public void setAddCoverImage3(String coverImage3) {
        this.addCoverImage3 = coverImage3;
    }

    public String getAddCoverImage3() {
        return addCoverImage3;
    }

    public void setAddCoverImage4(String coverImage4) {
        this.addCoverImage4 = coverImage4;
    }

    public String getAddCoverImage4() {
        return addCoverImage4;
    }

    public void setAddCoverImage5(String coverImage5) {
        this.addCoverImage5 = coverImage5;
    }

    public String getAddCoverImage5() {
        return addCoverImage5;
    }

    public void setAddCoverImage6(String coverImage6) {
        this.addCoverImage6 = coverImage6;
    }

    public String getAddCoverImage6() {
        return addCoverImage6;
    }

    public void setAddCoverImage7(String coverImage7) {
        this.addCoverImage7 = coverImage7;
    }

    public String getAddCoverImage7() {
        return addCoverImage7;
    }

    public void setAddCoverImage8(String coverImage8) {
        this.addCoverImage8 = coverImage8;
    }

    public String getAddCoverImage8() {
        return addCoverImage8;
    }

    public void setAddCoverImage9(String coverImage9) {
        this.addCoverImage9 = coverImage9;
    }

    public String getAddCoverImage9() {
        return addCoverImage9;
    }

    public void setAddCoverImage10(String coverImage10) {
        this.addCoverImage10 = coverImage10;
    }

    public String getAddCoverImage10() {
        return addCoverImage10;
    }
}
