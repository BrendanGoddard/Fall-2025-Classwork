package com.bgoddard.brendangoddardinfo5126inclass_1

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.bgoddard.brendangoddardinfo5126inclass_1.databinding.ActivityMainBinding


class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding

    private lateinit var defaultPokemon: TextView

    companion object {
        var pokemonS: Int = 1
        var nameS: String = ""
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

//        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.textView)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        defaultPokemon = findViewById<TextView>(R.id.TextView)

        val prefsEditor = getSharedPreferences("BrendanGoddardINFO5126InClass-1", MODE_PRIVATE)
        binding.TextView.setText(nameS)

    }

    fun onButtonClick(view: View) {
        val intent = Intent(this, SelectPokemonActivity::class.java).apply {
        }
        startActivity(intent)
    }

    override fun onPause() {
        super.onPause()
        val prefsEditor = getSharedPreferences("BrendanGoddardINFO5126InClass-1", MODE_PRIVATE).edit()
        prefsEditor.putString("defaultPokemon", binding.textView.toString())
        prefsEditor.apply()
    }

    override fun onDestroy() {
        super.onDestroy()
    }

    override fun onStop() {
        super.onStop()
    }

    override fun onStart() {
        super.onStart()
    }

    override fun onResume() {
        super.onResume()
    }
}