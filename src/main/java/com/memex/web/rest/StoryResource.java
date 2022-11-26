package com.memex.web.rest;

import com.memex.service.StoryService;
import com.memex.service.dto.StoryDTO;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.cgi.omni.raha.backend.domain.Story}.
 */
@RestController
@RequestMapping("/api")
public class StoryResource {

    private final Logger log = LoggerFactory.getLogger(StoryResource.class);

    private static final String ENTITY_NAME = "story";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StoryService storyService;

    public StoryResource(StoryService storyService) {
        this.storyService = storyService;
    }

    /**
     * {@code POST  /stories} : Create a new story.
     *
     * @param storyDTO the storyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new storyDTO;
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stories")
    public ResponseEntity<StoryDTO> createStory(@Valid @RequestBody StoryDTO storyDTO) throws URISyntaxException {
        log.debug("REST request to save Story");
        log.info("Story add media 1 {}", storyDTO.getAddCoverImage1());
        StoryDTO result = storyService.save(storyDTO);

        return ResponseEntity
            .created(new URI("/api/stories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stories} : Updates an existing story.
     *
     * @param storyDTO the storyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated storyDTO,
     * or with status {@code 400 (Bad Request)} if the storyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the storyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stories")
    public ResponseEntity<StoryDTO> updateStory(@Valid @RequestBody StoryDTO storyDTO) throws URISyntaxException {
        log.debug("REST request to update Story");
        StoryDTO result = storyService.save(storyDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, storyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /stories} : get all the stories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stories in body.
     */
    @GetMapping("/stories")
    public List<StoryDTO> getAllStorys() {
        log.debug("REST request to get all Storys");
        return storyService.findAll();
    }

    /**
     * {@code GET  /stories/:id} : get the "id" story.
     *
     * @param id the id of the storyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the storyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stories/{id}")
    public ResponseEntity<StoryDTO> getStory(@PathVariable Long id) {
        log.debug("REST request to get Story : {}", id);
        Optional<StoryDTO> storyDTO = storyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(storyDTO);
    }

    /**
     * {@code DELETE  /stories/:id} : delete the "id" story.
     *
     * @param id the id of the storyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stories/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        log.debug("REST request to delete Story : {}", id);
        storyService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
