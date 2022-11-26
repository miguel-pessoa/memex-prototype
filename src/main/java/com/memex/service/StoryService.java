package com.memex.service;

import com.memex.domain.Story;
import com.memex.repository.StoryRepository;
import com.memex.service.dto.StoryDTO;
import com.memex.service.mapper.StoryMapper;
import java.io.IOException;
import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Story}.
 */
@Service
@Transactional
public class StoryService {

    private final Logger log = LoggerFactory.getLogger(StoryService.class);

    private final StoryRepository storyRepository;

    private final StoryMapper storyMapper;

    public StoryService(StoryRepository storyRepository, StoryMapper storyMapper) {
        this.storyRepository = storyRepository;
        this.storyMapper = storyMapper;
    }

    /**
     * Save a story.
     *
     * @param storyDTO the entity to save.
     * @return the persisted entity.
     */
    public StoryDTO save(StoryDTO storyDTO) {
        log.debug("Request to save Story");
        storyDTO.setCreatedDate(Instant.now());
        StoryDTO story = storyMapper.toDto(storyRepository.save(storyMapper.toEntity(storyDTO)));

        return story;
    }

    /**
     * Get all the stories.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<StoryDTO> findAll() {
        log.debug("Request to get all Stories");
        return storyRepository.findAll().stream().map(storyMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one story by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<StoryDTO> findOne(Long id) {
        log.debug("Request to get Story : {}", id);
        return storyRepository.findById(id).map(storyMapper::toDto);
    }

    /**
     * Delete the story by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Story : {}", id);
        storyRepository.deleteById(id);
    }
}
