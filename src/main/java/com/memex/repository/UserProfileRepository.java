package com.memex.repository;

import com.memex.domain.UserProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProfileRepository extends BaseRepository<UserProfile> {
    Optional<UserProfile> findByUsername(String username);
}
