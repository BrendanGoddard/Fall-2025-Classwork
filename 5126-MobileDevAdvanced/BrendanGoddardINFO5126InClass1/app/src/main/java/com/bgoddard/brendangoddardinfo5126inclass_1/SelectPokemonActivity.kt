package com.bgoddard.brendangoddardinfo5126inclass_1

import android.os.Bundle
import android.view.View
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.bgoddard.brendangoddardinfo5126inclass_1.databinding.ActivitySelectPokemonBinding
class SelectPokemonActivity : AppCompatActivity() {

    lateinit var selectPokemonActivityBinding : ActivitySelectPokemonBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        selectPokemonActivityBinding = ActivitySelectPokemonBinding.inflate(layoutInflater)
        setContentView(selectPokemonActivityBinding.root)
//        setContentView(R.layout.activity_select_pokemon)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.textView)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }


        var spinValue:Int = intent.getIntExtra("NUM", 0)
        selectPokemonActivityBinding.spinner.setSelection(spinValue - 1)


    }

    fun onButtonReturn(view: View) {
        MainActivity.pokemonS = selectPokemonActivityBinding.spinner.selectedItemPosition+1

        finish()
    }
}