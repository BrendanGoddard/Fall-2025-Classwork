package com.bgoddard.reviewofandroid2

import android.app.Activity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.bgoddard.reviewofandroid2.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var editText: EditText
    lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
//        setContentView(R.layout.activity_main)
        binding = ActivityMainBinding.inflate(layoutInflater)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        editText = findViewById< EditText>(R.id.editTextName)
    }

    fun onButtonLogCat(view: View) {
        println(editText.text.toString())
    }

    fun onRadioClick(view: View) {
        // one was of doing it
        when(view.id)
        {
            R.id.radioButtonOne -> println("one was clicked")
            R.id.radioButtonTwo -> println("two was clicked")
            R.id.radioButtonThree -> println("three was clicked")
        }

        // other way
    }

}