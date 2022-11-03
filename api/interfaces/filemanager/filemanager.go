package filemanager

import (
	"io"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/AhEhIOhYou/manga-project/api/infrastructure/security"
)

type fileManager struct{}

// DeleteFile implements ManagerFileInterface
func (*fileManager) DeleteFile(path string) error {
	err := os.Remove(path)
	if err != nil {
		return err
	}
	return nil
}

// UploadFile implements ManagerFileInterface
func (*fileManager) UploadFile(file *multipart.FileHeader) (string, error) {
	newFileName := security.CreateName(file.Filename)
	fileExtension := filepath.Ext(file.Filename)
	uploadDir := os.Getenv("UPLOAD_DIR")
	path := uploadDir + "/" + newFileName + fileExtension

	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	out, err := os.Create(path)
	if err != nil {
		return "", err
	}
	defer out.Close()

	_, err = io.Copy(out, src)

	return path, nil
}

var _ ManagerFileInterface = &fileManager{}

type ManagerFileInterface interface {
	UploadFile(file *multipart.FileHeader) (string, error)
	DeleteFile(path string) error
}

func NewFileUpload() *fileManager {
	return &fileManager{}
}
