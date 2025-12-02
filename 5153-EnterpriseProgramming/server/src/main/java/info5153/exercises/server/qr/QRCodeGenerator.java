package info5153.exercises.server.qr;

import com.google.zxing.*;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.*;
import com.google.zxing.common.BitMatrix;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import java.io.ByteArrayOutputStream;

@Component
public class QRCodeGenerator {
    public static byte[] generateQRCode(String content) {
        byte[] qrcode = null;
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BitMatrix matrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, 256, 256);
            MatrixToImageWriter.writeToStream(matrix, MediaType.IMAGE_PNG.getSubtype(), baos, new MatrixToImageConfig());
            qrcode = baos.toByteArray();
        } catch (Exception ex) {
            System.out.println("QRcode failed " + ex.getMessage());
        }
        return qrcode;
    }
}