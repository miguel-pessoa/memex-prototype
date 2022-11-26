package com.memex.service.mapper;

import com.memex.domain.Story;
import com.memex.service.dto.StoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Story} and its DTO {@link StoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StoryMapper extends EntityMapper<StoryDTO, Story> {
    Story toEntity(StoryDTO storyDTO);

    StoryDTO toDto(Story storyDTO);

    default Story fromId(Long id) {
        if (id == null) {
            return null;
        }
        Story story = new Story();
        story.setId(id);
        return story;
    }
}
