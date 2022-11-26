package com.memex.service;

import com.memex.domain.UserProfile;
import com.memex.repository.UserProfileRepository;
import com.memex.service.dto.UserProfileDTO;
import com.memex.service.mapper.UserProfileMapper;
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
 * Service Implementation for managing {@link UserProfile}.
 */
@Service
@Transactional
public class UserProfileService {

    private final Logger log = LoggerFactory.getLogger(UserProfileService.class);

    private final UserProfileRepository userProfileRepository;

    private final UserProfileMapper userProfileMapper;

    public UserProfileService(UserProfileRepository userProfileRepository, UserProfileMapper userProfileMapper) {
        this.userProfileRepository = userProfileRepository;
        this.userProfileMapper = userProfileMapper;
    }

    /**
     * Save a userProfile.
     *
     * @param userProfileDTO the entity to save.
     * @return the persisted entity.
     */
    public UserProfileDTO save(UserProfileDTO userProfileDTO) {
        log.debug("Request to save UserProfile");
        UserProfileDTO userProfile = userProfileMapper.toDto(userProfileRepository.save(userProfileMapper.toEntity(userProfileDTO)));

        return userProfile;
    }

    /**
     * Get all the stories.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<UserProfileDTO> findAll() {
        log.debug("Request to get all Stories");
        return userProfileRepository.findAll().stream().map(userProfileMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one userProfile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UserProfileDTO> findOne(Long id) {
        log.debug("Request to get UserProfile : {}", id);
        return userProfileRepository.findById(id).map(userProfileMapper::toDto);
    }

    /**
     * Get one userProfile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UserProfileDTO> findByUsername(String username) {
        log.debug("Request to get UserProfile by username : {}", username);
        return userProfileRepository.findByUsername(username).map(userProfileMapper::toDto);
    }

    /**
     * Delete the userProfile by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete UserProfile : {}", id);
        userProfileRepository.deleteById(id);
    }
}
