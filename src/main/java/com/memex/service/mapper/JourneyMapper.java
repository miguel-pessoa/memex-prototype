package com.memex.service.mapper;

import com.memex.domain.*;
import com.memex.service.dto.JourneyDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Journey} and its DTO {@link JourneyDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface JourneyMapper extends EntityMapper<JourneyDTO, Journey> {
    Journey toEntity(JourneyDTO journeyDTO);

    JourneyDTO toDto(Journey journeyDTO);

    default Journey fromId(Long id) {
        if (id == null) {
            return null;
        }
        Journey journey = new Journey();
        journey.setId(id);
        return journey;
    }
}
