package com.memex.web.rest;

import com.memex.service.JourneyService;
import com.memex.service.dto.JourneyDTO;
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
 * REST controller for managing {@link com.cgi.omni.raha.backend.domain.Journey}.
 */
@RestController
@RequestMapping("/api")
public class JourneyResource {

    private final Logger log = LoggerFactory.getLogger(JourneyResource.class);

    private static final String ENTITY_NAME = "journey";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JourneyService journeyService;

    public JourneyResource(JourneyService journeyService) {
        this.journeyService = journeyService;
    }

    /**
     * {@code POST  /journeys} : Create a new journey.
     *
     * @param journeyDTO the journeyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new journeyDTO;
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/journeys")
    public ResponseEntity<JourneyDTO> createJourney(@Valid @RequestBody JourneyDTO journeyDTO) throws URISyntaxException {
        log.debug("REST request to save Journey");
        JourneyDTO result = journeyService.save(journeyDTO);
        return ResponseEntity
            .created(new URI("/api/journeys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /journeys} : Updates an existing journey.
     *
     * @param journeyDTO the journeyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated journeyDTO,
     * or with status {@code 400 (Bad Request)} if the journeyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the journeyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/journeys")
    public ResponseEntity<JourneyDTO> updateJourney(@Valid @RequestBody JourneyDTO journeyDTO) throws URISyntaxException {
        log.debug("REST request to update Journey");
        JourneyDTO result = journeyService.save(journeyDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, journeyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /journeys} : get all the journeys.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of journeys in body.
     */
    @GetMapping("/journeys")
    public List<JourneyDTO> getAllJourneys() {
        log.debug("REST request to get all Journeys");
        return journeyService.findAll();
    }

    /**
     * {@code GET  /journeys/:id} : get the "id" journey.
     *
     * @param id the id of the journeyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the journeyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/journeys/{id}")
    public ResponseEntity<JourneyDTO> getJourney(@PathVariable Long id) {
        log.debug("REST request to get Journey : {}", id);
        Optional<JourneyDTO> journeyDTO = journeyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(journeyDTO);
    }

    /**
     * {@code DELETE  /journeys/:id} : delete the "id" journey.
     *
     * @param id the id of the journeyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/journeys/{id}")
    public ResponseEntity<Void> deleteJourney(@PathVariable Long id) {
        log.debug("REST request to delete Journey : {}", id);
        journeyService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
