package info5153.exercises.server.qr;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class QRCodeController {

    @GetMapping("/api/qrcode/{content}")
    public ResponseEntity<byte[]> getQRCode(@PathVariable String content) {
        byte[] rawBytes = QRCodeGenerator.generateQRCode(content);
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<byte[]>(rawBytes, headers, HttpStatus.CREATED);
    }
}