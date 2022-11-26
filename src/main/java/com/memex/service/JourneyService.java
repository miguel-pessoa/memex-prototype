package com.memex.service;

import com.memex.domain.Journey;
import com.memex.repository.JourneyRepository;
import com.memex.service.dto.JourneyDTO;
import com.memex.service.mapper.JourneyMapper;
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
 * Service Implementation for managing {@link Journey}.
 */
@Service
@Transactional
public class JourneyService {

    private final Logger log = LoggerFactory.getLogger(JourneyService.class);

    private final JourneyRepository journeyRepository;

    private final JourneyMapper journeyMapper;

    public JourneyService(JourneyRepository journeyRepository, JourneyMapper journeyMapper) {
        this.journeyRepository = journeyRepository;
        this.journeyMapper = journeyMapper;
    }

    /**
     * Save a journey.
     *
     * @param journeyDTO the entity to save.
     * @return the persisted entity.
     */
    public JourneyDTO save(JourneyDTO journeyDTO) {
        log.debug("Request to save Journey");
        journeyDTO.setCreatedDate(Instant.now());
        return journeyMapper.toDto(journeyRepository.save(journeyMapper.toEntity(journeyDTO)));
    }

    /**
     * Get all the stories.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<JourneyDTO> findAll() {
        log.debug("Request to get all Stories");
        return journeyRepository.findAll().stream().map(journeyMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one journey by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<JourneyDTO> findOne(Long id) {
        log.debug("Request to get Journey : {}", id);
        return journeyRepository.findById(id).map(journeyMapper::toDto);
    }

    /**
     * Delete the journey by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Journey : {}", id);
        journeyRepository.deleteById(id);
    }
}
