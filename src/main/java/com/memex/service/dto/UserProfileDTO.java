package com.memex.service.dto;

import javax.validation.constraints.Size;

public class UserProfileDTO extends BaseCreateUpdateDTO {

    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String username;

    private String coverImage;

    private Long age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    public Long getAge() {
        return age;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getCoverImage() {
        return coverImage;
    }
}
