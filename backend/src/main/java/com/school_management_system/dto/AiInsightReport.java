package com.school_management_system.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data // Generates getters, setters, toString, equals, and hashCode automatically
@NoArgsConstructor // Required by JSON deserializers to initialize the object
@AllArgsConstructor // Allows easy manual initialization if needed
public class AiInsightReport {
    
    private String summary;
    private List<AiAlert> alerts;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AiAlert {
        private int id;
        private String type; // Expected by UI: "danger" or "warning"
        private String message;
    }
}
