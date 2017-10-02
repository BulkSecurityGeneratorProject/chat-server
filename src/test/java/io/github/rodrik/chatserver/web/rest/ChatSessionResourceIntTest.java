package io.github.rodrik.chatserver.web.rest;

import io.github.rodrik.chatserver.ChatserverApp;

import io.github.rodrik.chatserver.domain.ChatSession;
import io.github.rodrik.chatserver.repository.ChatSessionRepository;
import io.github.rodrik.chatserver.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ChatSessionResource REST controller.
 *
 * @see ChatSessionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChatserverApp.class)
public class ChatSessionResourceIntTest {

    @Autowired
    private ChatSessionRepository chatSessionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChatSessionMockMvc;

    private ChatSession chatSession;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChatSessionResource chatSessionResource = new ChatSessionResource(chatSessionRepository);
        this.restChatSessionMockMvc = MockMvcBuilders.standaloneSetup(chatSessionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChatSession createEntity(EntityManager em) {
        ChatSession chatSession = new ChatSession();
        return chatSession;
    }

    @Before
    public void initTest() {
        chatSession = createEntity(em);
    }

    @Test
    @Transactional
    public void createChatSession() throws Exception {
        int databaseSizeBeforeCreate = chatSessionRepository.findAll().size();

        // Create the ChatSession
        restChatSessionMockMvc.perform(post("/api/chat-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatSession)))
            .andExpect(status().isCreated());

        // Validate the ChatSession in the database
        List<ChatSession> chatSessionList = chatSessionRepository.findAll();
        assertThat(chatSessionList).hasSize(databaseSizeBeforeCreate + 1);
        ChatSession testChatSession = chatSessionList.get(chatSessionList.size() - 1);
    }

    @Test
    @Transactional
    public void createChatSessionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chatSessionRepository.findAll().size();

        // Create the ChatSession with an existing ID
        chatSession.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChatSessionMockMvc.perform(post("/api/chat-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatSession)))
            .andExpect(status().isBadRequest());

        // Validate the ChatSession in the database
        List<ChatSession> chatSessionList = chatSessionRepository.findAll();
        assertThat(chatSessionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChatSessions() throws Exception {
        // Initialize the database
        chatSessionRepository.saveAndFlush(chatSession);

        // Get all the chatSessionList
        restChatSessionMockMvc.perform(get("/api/chat-sessions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatSession.getId().intValue())));
    }

    @Test
    @Transactional
    public void getChatSession() throws Exception {
        // Initialize the database
        chatSessionRepository.saveAndFlush(chatSession);

        // Get the chatSession
        restChatSessionMockMvc.perform(get("/api/chat-sessions/{id}", chatSession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chatSession.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingChatSession() throws Exception {
        // Get the chatSession
        restChatSessionMockMvc.perform(get("/api/chat-sessions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChatSession() throws Exception {
        // Initialize the database
        chatSessionRepository.saveAndFlush(chatSession);
        int databaseSizeBeforeUpdate = chatSessionRepository.findAll().size();

        // Update the chatSession
        ChatSession updatedChatSession = chatSessionRepository.findOne(chatSession.getId());

        restChatSessionMockMvc.perform(put("/api/chat-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChatSession)))
            .andExpect(status().isOk());

        // Validate the ChatSession in the database
        List<ChatSession> chatSessionList = chatSessionRepository.findAll();
        assertThat(chatSessionList).hasSize(databaseSizeBeforeUpdate);
        ChatSession testChatSession = chatSessionList.get(chatSessionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingChatSession() throws Exception {
        int databaseSizeBeforeUpdate = chatSessionRepository.findAll().size();

        // Create the ChatSession

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restChatSessionMockMvc.perform(put("/api/chat-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatSession)))
            .andExpect(status().isCreated());

        // Validate the ChatSession in the database
        List<ChatSession> chatSessionList = chatSessionRepository.findAll();
        assertThat(chatSessionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteChatSession() throws Exception {
        // Initialize the database
        chatSessionRepository.saveAndFlush(chatSession);
        int databaseSizeBeforeDelete = chatSessionRepository.findAll().size();

        // Get the chatSession
        restChatSessionMockMvc.perform(delete("/api/chat-sessions/{id}", chatSession.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ChatSession> chatSessionList = chatSessionRepository.findAll();
        assertThat(chatSessionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatSession.class);
        ChatSession chatSession1 = new ChatSession();
        chatSession1.setId(1L);
        ChatSession chatSession2 = new ChatSession();
        chatSession2.setId(chatSession1.getId());
        assertThat(chatSession1).isEqualTo(chatSession2);
        chatSession2.setId(2L);
        assertThat(chatSession1).isNotEqualTo(chatSession2);
        chatSession1.setId(null);
        assertThat(chatSession1).isNotEqualTo(chatSession2);
    }
}
