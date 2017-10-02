package io.github.rodrik.chatserver.repository;

import io.github.rodrik.chatserver.domain.ChatSession;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ChatSession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {

}
