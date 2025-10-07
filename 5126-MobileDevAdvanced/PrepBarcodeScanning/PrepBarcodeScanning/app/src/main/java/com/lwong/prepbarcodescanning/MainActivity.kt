package com.lwong.prepbarcodescanning

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Bundle
import android.util.Pair
import android.view.View
import android.widget.ImageView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.graphics.scale
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.google.mlkit.vision.barcode.BarcodeScannerOptions
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.common.InputImage
import java.io.IOException
import java.io.InputStream
import kotlin.math.max

class MainActivity : AppCompatActivity() {
    lateinit var mImageView: ImageView
    // Max width (portrait mode)
    private var mImageMaxWidth: Int? = null
    // Max height (portrait mode)
    private var mImageMaxHeight: Int? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        mImageView = findViewById<ImageView>(R.id.imageView)
    }

    // gotten from OCR Demo
    fun getBitmapFromAsset(context: Context, filePath: String): Bitmap? {
        val assetManager = context.assets

        val `is`: InputStream?
        var bitmap: Bitmap? = null
        try {
            `is` = assetManager.open(filePath)
            bitmap = BitmapFactory.decodeStream(`is`)
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return bitmap
    }

    // Functions for loading images from app assets.
    // Returns max image width, always for portrait mode. Caller needs to swap width / height for
    // landscape mode.
    private fun getImageMaxWidth(): Int {
        if (mImageMaxWidth == null) {
            // Calculate the max width in portrait mode. This is done lazily since we need to
            // wait for
            // a UI layout pass to get the right values. So delay it to first time image
            // rendering time.
            mImageMaxWidth = mImageView.width
        }
        return mImageMaxWidth!!
    }

    // Returns max image height, always for portrait mode. Caller needs to swap width / height for
    // landscape mode.
    private fun getImageMaxHeight(): Int {
        if (mImageMaxHeight == null) {
            // Calculate the max width in portrait mode. This is done lazily since we need to
            // wait for
            // a UI layout pass to get the right values. So delay it to first time image
            // rendering time.
            mImageMaxHeight =
                mImageView.height
        }
        return mImageMaxHeight!!
    }

    // Gets the targeted width / height.
    private fun getTargetedWidthHeight(): Pair<Int?, Int?> {
        val targetWidth: Int
        val targetHeight: Int
        val maxWidthForPortraitMode = getImageMaxWidth()
        val maxHeightForPortraitMode = getImageMaxHeight()
        targetWidth = maxWidthForPortraitMode
        targetHeight = maxHeightForPortraitMode
        return Pair<Int?, Int?>(targetWidth, targetHeight)
    }

    fun onButtonScan(view: View) {
        var im:String = ""
        when(view.id){
            R.id.buttonScan -> im = "info5126.jpg"
            R.id.buttonQR -> im= "fanshawe.jpeg"
        }
        var mSelectedImage =
            getBitmapFromAsset(this, im)
        if (mSelectedImage != null) {
            // Get the dimensions of the View
            val targetedSize = getTargetedWidthHeight()

            val targetWidth: Int = targetedSize.first!!
            val maxHeight: Int = targetedSize.second!!

            // Determine how much to scale down the image
            val scaleFactor = max(
                mSelectedImage.width.toFloat() / targetWidth.toFloat(),
                mSelectedImage.height.toFloat() / maxHeight.toFloat()
            )

            val resizedBitmap =
                mSelectedImage.scale(
                    (mSelectedImage.width / scaleFactor).toInt(),
                    (mSelectedImage.height / scaleFactor).toInt()
                )
            mImageView.setImageBitmap(resizedBitmap)
            mSelectedImage = resizedBitmap
            BarcodeScannerOptions.Builder()
                .enableAllPotentialBarcodes() // Optional
                .build()
            val image: InputImage
            image = InputImage.fromBitmap(mSelectedImage, 0)
            val scanner = BarcodeScanning.getClient()
            scanner.process(image)
                .addOnSuccessListener { barcodes ->
                    // Task completed successfully
                    // ...
                    for (barcode in barcodes) {
 //                       println(barcode.rawValue)
                        barcode.boundingBox
                        barcode.cornerPoints

                        barcode.rawValue
                        println(barcode.valueType)

                        val valueType = barcode.valueType
                        // See API reference for complete list of supported types
                        when (valueType) {
                            Barcode.TYPE_WIFI -> {
                                println("Wifi: " +barcode.wifi!!.ssid)
                                println("Wifi: " +barcode.wifi!!.password)
                                println("Wifi: " +barcode.wifi!!.encryptionType)
                            }
                            Barcode.TYPE_URL -> {
                                println("url title: " + barcode.url!!.title)
                                println("url: " + barcode.url!!.url)
                            }
                            Barcode.TYPE_SMS -> {
                                println("SMS: " + barcode.rawValue)
                            }
                            Barcode.TYPE_TEXT -> {
                                println("TEXT: " + barcode.rawValue)
                            }
                            else -> {
                                println("Type: " + valueType)
                                println("RawValue: " + barcode.rawValue)
                            }
                        }
                    }
                }
                .addOnFailureListener {
                    // Task failed with an exception
                    // ...
                }
        }
    }

}