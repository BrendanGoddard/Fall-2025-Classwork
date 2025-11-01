package com.bgoddard.bgoddardmidterm

import android.content.Context
import android.os.Bundle
import android.widget.RadioButton
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.bgoddard.bgoddardmidterm.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private val pokemonList = arrayListOf(
        Pokemon(catch = 45, name = "Bulbasaur", pokedex = 1, type = "Grass"),
        Pokemon(catch = 45, name = "Charmander", pokedex = 4, type = "Fire"),
        Pokemon(catch = 45, name = "Squirtle", pokedex = 7, type = "Water"),
        Pokemon(catch = 45, name = "Butterfree", pokedex = 12, type = "Bug"),
        Pokemon(catch = 255, name = "Pidgey", pokedex = 16, type = "Flying"),
        Pokemon(catch = 190, name = "Pikachu", pokedex = 25, type = "Electric"),
        Pokemon(catch = 45, name = "Chikorita", pokedex = 152, type = "Grass")
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Restore saved pokemon and update UI if available
        val savedPokemon = getSavedPokemon()
        savedPokemon?.let { updateUI(it) }
    }

    fun receivePokemon(name: String): String {
        val found = pokemonList.find { it.name.equals(name, ignoreCase = true) }
        found?.let {
            savePokemonSelection(it)
            updateUI(it)
            return "${it.name}\nPokedex: ${it.pokedex}\nType: ${it.type}\nCatch Rate: ${it.catch}"
        }
        binding.infoText.text = "Pokémon not found."
        binding.radioGroup.clearCheck()
        return "Pokémon not found."
    }

    private fun updateUI(pokemon: Pokemon) {
        // Update TextView
        binding.infoText.text =
            "${pokemon.name}\nPokedex: ${pokemon.pokedex}\nType: ${pokemon.type}\nCatch Rate: ${pokemon.catch}"

        // Match the name to a radio button
        val radioButtonId = when (pokemon.name?.lowercase()) {
            "bulbasaur" -> R.id.radioButtonBulbasaur
            "charmander" -> R.id.radioButtonCharmander
            "squirtle" -> R.id.radioButtonSquirtle
            "butterfree" -> R.id.radioButtonButterfree
            "pidgey" -> R.id.radioButtonPidgey
            "pikachu" -> R.id.radioButtonPikachu
            "chikorita" -> R.id.radioButtonChikorita
            else -> null
        }

        radioButtonId?.let {
            val button = findViewById<RadioButton>(it)
            button.isChecked = true
        }
    }

    private fun savePokemonSelection(pokemon: Pokemon) {
        val prefs = getSharedPreferences("Prefs", Context.MODE_PRIVATE)
        prefs.edit()
            .putString("selectedPokemonName", pokemon.name)
            .putInt("selectedPokemonPokedex", pokemon.pokedex)
            .putString("selectedPokemonType", pokemon.type)
            .putInt("selectedPokemonCatch", pokemon.catch)
            .apply()
    }

    private fun getSavedPokemon(): Pokemon? {
        val prefs = getSharedPreferences("Prefs", Context.MODE_PRIVATE)
        val name = prefs.getString("selectedPokemonName", null)
        val pokedex = prefs.getInt("selectedPokemonPokedex", 0)
        val type = prefs.getString("selectedPokemonType", null)
        val catch = prefs.getInt("selectedPokemonCatch", 0)
        return if (name != null && type != null) Pokemon(catch, name, pokedex, type) else null
    }
}
