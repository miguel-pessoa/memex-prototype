package com.memex.service.mapper;

import com.memex.domain.UserProfile;
import com.memex.service.dto.UserProfileDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserProfile} and its DTO {@link UserProfileDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UserProfileMapper extends EntityMapper<UserProfileDTO, UserProfile> {
    UserProfile toEntity(UserProfileDTO storyDTO);

    UserProfileDTO toDto(UserProfile storyDTO);

    default UserProfile fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserProfile story = new UserProfile();
        story.setId(id);
        return story;
    }
}
