package com.examly.springapp;

import com.examly.springapp.controller.PlantController;
import com.examly.springapp.model.Plant;
import com.examly.springapp.service.PlantService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class PlantControllerTests {

    private MockMvc mockMvc;

    @InjectMocks
    private PlantController plantController;

    @Mock
    private PlantService plantService;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(plantController).build();
        objectMapper = new ObjectMapper();
    }

   

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetAllPlants() throws Exception {
        Plant p1 = new Plant("Lily", 3, 5, 20);
        p1.setId(1L);
        Plant p2 = new Plant("Tulip", 4, 7, 30);
        p2.setId(2L);

        when(plantService.getAllPlants()).thenReturn(Arrays.asList(p1, p2));

        mockMvc.perform(get("/api/plants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].plantName", is("Lily")))
                .andExpect(jsonPath("$[1].plantName", is("Tulip")));

        verify(plantService, times(1)).getAllPlants();
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetCarePlan_WaterMethod() throws Exception {
        Plant p1 = new Plant("Aloe", 1, 5, 10);
        p1.setId(1L);
        Plant p2 = new Plant("Cactus", 5, 8, 60);
        p2.setId(2L);

        when(plantService.generateCarePlan("water")).thenReturn(Arrays.asList(p1, p2));

        mockMvc.perform(get("/api/plants/plan?method=water"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].plantName", is("Aloe")))
                .andExpect(jsonPath("$[1].plantName", is("Cactus")));

        verify(plantService, times(1)).generateCarePlan("water");
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetCarePlan_SunlightMethod() throws Exception {
        Plant p1 = new Plant("Sunflower", 2, 10, 15);
        p1.setId(1L);
        Plant p2 = new Plant("Fern", 3, 6, 20);
        p2.setId(2L);

        when(plantService.generateCarePlan("sunlight")).thenReturn(Arrays.asList(p1, p2));

        mockMvc.perform(get("/api/plants/plan?method=sunlight"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].plantName", is("Sunflower")))
                .andExpect(jsonPath("$[1].plantName", is("Fern")));

        verify(plantService, times(1)).generateCarePlan("sunlight");
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testDeletePlant_Found() throws Exception {
        when(plantService.getPlantById(1L)).thenReturn(Optional.of(new Plant()));

        doNothing().when(plantService).deletePlant(1L);

        mockMvc.perform(delete("/api/plants/1"))
                .andExpect(status().isNoContent());

        verify(plantService, times(1)).deletePlant(1L);
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testDeletePlant_NotFound() throws Exception {
        when(plantService.getPlantById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(delete("/api/plants/1"))
                .andExpect(status().isNotFound());

        verify(plantService, never()).deletePlant(1L);
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetAllPlants_EmptyList() throws Exception {
        when(plantService.getAllPlants()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/plants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        verify(plantService, times(1)).getAllPlants();
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testAddPlant_NullBody() throws Exception {
        mockMvc.perform(post("/api/plants")
                .contentType(MediaType.APPLICATION_JSON)
                .content(""))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetCarePlan_NoMethodParam() throws Exception {
        Plant p1 = new Plant("Mint", 2, 4, 10);
        p1.setId(1L);

        when(plantService.generateCarePlan(null)).thenReturn(Collections.singletonList(p1));

        mockMvc.perform(get("/api/plants/plan"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].plantName", is("Mint")));

        verify(plantService, times(1)).generateCarePlan(null);
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetCarePlan_InvalidMethodReturnsUnsorted() throws Exception {
        Plant p1 = new Plant("Rose", 2, 6, 15);
        Plant p2 = new Plant("Lavender", 4, 5, 20);

        when(plantService.generateCarePlan("invalid")).thenReturn(Arrays.asList(p1, p2));

        mockMvc.perform(get("/api/plants/plan?method=invalid"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].plantName", is("Rose")))
                .andExpect(jsonPath("$[1].plantName", is("Lavender")));

        verify(plantService, times(1)).generateCarePlan("invalid");
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testDeletePlant_MultipleDeletes() throws Exception {
        when(plantService.getPlantById(5L)).thenReturn(Optional.of(new Plant()));

        doNothing().when(plantService).deletePlant(5L);

        // Perform deletion twice to check repeated calls
        mockMvc.perform(delete("/api/plants/5"))
                .andExpect(status().isNoContent());

        mockMvc.perform(delete("/api/plants/5"))
                .andExpect(status().isNoContent());

        verify(plantService, times(2)).deletePlant(5L);
    }



}
