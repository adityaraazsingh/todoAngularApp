package com.todo.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import net.coobird.thumbnailator.Thumbnails;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class fileService {

  private String UPLOAD_DIR = "uploads/";

  public String save(MultipartFile file, String userName){
    try{
      String fileName = userName;
      String originalFileName = file.getOriginalFilename();
      String extension = ".jpg";

      Path path = Paths.get(UPLOAD_DIR + fileName + extension);

      Thumbnails.of(file.getInputStream())
        .size(100,100)
        .outputFormat("jpg")
        .outputQuality(0.7)
        .toFile(path.toFile());

      return fileName + extension;

    }catch (IOException e){
      throw new RuntimeException("Failed to save the file" ,e);
    }
  }

}
