package com.memex.service.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.memex.service.dto.BaseDTO;
import java.time.Instant;
import java.util.Objects;
import javax.validation.Valid;
import javax.validation.constraints.*;

public class BaseCreateUpdateDTO extends BaseDTO {

    @JsonProperty("createdTime")
    private Instant createdTime;

    @JsonProperty("updatedTime")
    private Instant updatedTime;

    public BaseCreateUpdateDTO createdTime(Instant createdTime) {
        this.createdTime = createdTime;
        return this;
    }

    @Valid
    public Instant getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Instant createdTime) {
        this.createdTime = createdTime;
    }

    public BaseCreateUpdateDTO updatedTime(Instant updatedTime) {
        this.updatedTime = updatedTime;
        return this;
    }

    @Valid
    public Instant getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Instant updatedTime) {
        this.updatedTime = updatedTime;
    }

    @Override
    public boolean equals(java.lang.Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BaseCreateUpdateDTO baseCreateUpdate = (BaseCreateUpdateDTO) o;
        return (
            Objects.equals(this.createdTime, baseCreateUpdate.createdTime) &&
            Objects.equals(this.updatedTime, baseCreateUpdate.updatedTime) &&
            super.equals(o)
        );
    }

    /**
     * Compares the entity without the superclass
     */
    public boolean equalsNoSuper(java.lang.Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BaseCreateUpdateDTO baseCreateUpdate = (BaseCreateUpdateDTO) o;
        return (
            Objects.equals(this.createdTime, baseCreateUpdate.createdTime) && Objects.equals(this.updatedTime, baseCreateUpdate.updatedTime)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(createdTime, updatedTime, super.hashCode());
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class BaseCreateUpdateDTO {\n");
        sb.append("    ").append(toIndentedString(super.toString())).append("\n");
        sb.append("    createdTime: ").append(toIndentedString(createdTime)).append("\n");
        sb.append("    updatedTime: ").append(toIndentedString(updatedTime)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(java.lang.Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}
