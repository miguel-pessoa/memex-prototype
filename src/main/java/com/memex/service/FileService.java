package com.memex.service;

import com.memex.domain.FileEntity;
import com.memex.repository.FilesRepository;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

    private final FilesRepository fileRepository;

    @Autowired
    public FileService(FilesRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FileEntity save(MultipartFile file, String kind, String entity, Long id) throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        fileEntity.setContentType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setSize(file.getSize());
        fileEntity.setKind(kind);
        fileEntity.setEntity(entity);
        fileEntity.setEntityId(id);

        return fileRepository.save(fileEntity);
    }

    public Optional<FileEntity> getFile(String id) {
        return fileRepository.findById(id);
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }
}
