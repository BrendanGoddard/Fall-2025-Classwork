package com.bgoddard.bgoddardmidterm

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast

class FirstFragment : Fragment() {

    private lateinit var buttonFirst: Button
    private lateinit var editText: EditText

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_first, container, false)

        buttonFirst = view.findViewById(R.id.buttonFirst)
        editText = view.findViewById(R.id.editText)

        buttonFirst.setOnClickListener {
            val inputName = editText.text.toString().trim()
            val result = (activity as? MainActivity)?.receivePokemon(inputName)
            Toast.makeText(requireContext(), result, Toast.LENGTH_LONG).show()
        }

        return view
    }
}
