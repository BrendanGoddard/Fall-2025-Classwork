package com.lwong.prepgooglemaps

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.graphics.Color
import android.location.Address
import android.location.Geocoder
import android.location.Location
import androidx.fragment.app.Fragment

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices

import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.GroundOverlayOptions
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.gms.maps.model.PolylineOptions
import com.google.android.gms.tasks.OnSuccessListener
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.CircularBounds
import com.google.android.libraries.places.api.model.LocationRestriction
import com.google.android.libraries.places.api.model.Place

import com.google.android.libraries.places.api.net.PlacesClient
import com.google.android.libraries.places.api.net.SearchNearbyRequest
import java.io.IOException
import java.util.Locale

class MapsFragment : Fragment() {
    private lateinit var fusedLocationClient: FusedLocationProviderClient

    // Fanshawe Oxford St. , used for drawing line
    var fanshawe = LatLng(43.012440,-81.200180)
    var downtown = LatLng(42.98,-81.25)
    // Used for selecting the Current Place using Google Places
    private lateinit var mPlacesClient: PlacesClient
    lateinit var myGoogleMap: GoogleMap
    lateinit var currentLocation:Location
    private val locationPermissionRequest = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        when {
            permissions.getOrDefault(Manifest.permission.ACCESS_FINE_LOCATION, false) -> {
                // Precise location access granted.
                // You can now safely enable the location layer.
                enableMyLocation()
            }
            permissions.getOrDefault(Manifest.permission.ACCESS_COARSE_LOCATION, false) -> {
                // Only approximate location access granted.
                // You can still enable the location layer, but accuracy will be lower.
                enableMyLocation()
            } else -> {
            // No location access granted.
            // Handle the case where the user denies the permission.
            // You may want to show a dialog explaining why the feature is disabled.
            Log.d("PermissionCheck", "User denied location permissions.")
        }
        }
    }
    private fun checkAndRequestLocationPermissions() {
        when {
            ContextCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED -> {
                // You can use the API that requires the permission.
                enableMyLocation()
            }
            // Optional: Provide an additional rationale to the user if the permission was not granted
            // and the user has not previously denied the request with "Don't ask again".
            ActivityCompat.shouldShowRequestPermissionRationale(
                requireActivity(), Manifest.permission.ACCESS_FINE_LOCATION
            ) -> {
                // In an educational UI, explain to the user why your app requires this
                // permission for a specific feature to behave as expected.
                // After showing the rationale, launch the request.
                AlertDialog.Builder(requireContext())
                    .setTitle("Location Permission Needed")
                    .setMessage("This app needs the Location permission to show your position on the map.")
                    .setPositiveButton("OK") { _, _ ->
                        locationPermissionRequest.launch(arrayOf(
                            Manifest.permission.ACCESS_FINE_LOCATION,
                            Manifest.permission.ACCESS_COARSE_LOCATION))
                    }
                    .create()
                    .show()
            }
            else -> {
                // Directly ask for the permission.
                locationPermissionRequest.launch(arrayOf(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ))
            }
        }
    }

    @SuppressLint("MissingPermission")
    private fun enableMyLocation() {
        // This is the function that will crash if permissions are not granted.
        // Ensure you only call it after confirming permissions.
        if (::myGoogleMap.isInitialized) {
            myGoogleMap.isMyLocationEnabled = true
        }
    }

    @SuppressLint("MissingPermission")
    private val callback = OnMapReadyCallback { googleMap ->
        /**
         * Manipulates the map once available.
         * This callback is triggered when the map is ready to be used.
         * This is where we can add markers or lines, add listeners or move the camera.
         * In this case, we just add a marker near Sydney, Australia.
         * If Google Play services is not installed on the device, the user will be prompted to
         * install it inside the SupportMapFragment. This method will only be triggered once the
         * user has installed Google Play services and returned to the app.
         */
        myGoogleMap = googleMap
        val sydney = LatLng(-34.0, 151.0)
        googleMap.addMarker(MarkerOptions().position(fanshawe).title("Fanshawe College"))
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(fanshawe,15f))

        // Instead of calling enableMyLocation() directly,    // call the function that checks permissions first.
        checkAndRequestLocationPermissions()

        // Fetch and move the map to the current location
        getCurrentLocation()

        // set the LongClick on the map to add a green marker with Reverse Geocoding to get the address from the LatLng
        setMapLongClick(googleMap)

        // drawing lines onto the overlay
        googleMap.addPolyline(
                  PolylineOptions().add(downtown,fanshawe)
                      .width(5.0f)
                      .color(Color.BLUE)
                      .geodesic(true))
              // adding a image onto the overlay
        val overlaySize = 100f
        val androidOverlay = GroundOverlayOptions()
                  .image(BitmapDescriptorFactory.fromResource(R.drawable.bullseye))
                  .position(downtown, overlaySize)
        googleMap.addGroundOverlay(androidOverlay)

        // shows the zoom controls
        googleMap.uiSettings.isZoomControlsEnabled = true
        // shows the traffic conditions
        googleMap.isTrafficEnabled = true

        // use Google Places
        // old version
        //getCurrentPlaceLikelihoods()
        // new version uses Places API (New)
        findNearbyPlaces()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_maps, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // Initialize the FusedLocationProviderClient for current location
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireContext())

        // Construct a PlacesClient
        // Look in Gradle-Module-defaultConfig
        // Note: hiding the key in the build grade module
        /*
        * Go to the build gradle module
        * at the top of the file notice the two imports added
        * Then after the plugins, notice the assignment of local properties variable
        * then in the Android-defaultConfig a string table entry is created
        * using the local.properties maps_api_key value
        */

        Places.initialize(activity as MainActivity, getString(R.string.maps_api_key))
        mPlacesClient = Places.createClient(activity as MainActivity)

        val mapFragment = childFragmentManager.findFragmentById(R.id.map) as SupportMapFragment?
        mapFragment?.getMapAsync(callback)
    }

    // gets the current location using the fusedLocationClient
    @SuppressLint("MissingPermission")
    private fun getCurrentLocation() {
        // Get the last known location using FusedLocationProviderClient
        fusedLocationClient.lastLocation
            .addOnSuccessListener(requireActivity(), OnSuccessListener<Location> { location ->
                if (location != null) {
                    // Move the camera to the current location
                    val latLng = LatLng(location.latitude, location.longitude)
                    myGoogleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latLng, 15f))

                    // Add a marker at the current location
                    // getAddress uses Reverse Geocoding to determine an address from a latlng
                    myGoogleMap.addMarker(MarkerOptions().position(latLng).title(getAddress(latLng))
                        .snippet("You are here"))
                    currentLocation = location
                } else {
                    // Handle case when the location is null
                    println("Unable to get current location")
                }
            })
    }
    /* uses reverse geocoding to determine an address from
LatLong position.   Use Geocoding to determine the LatLong position from address
In this case we are giving the LatLong of Bud Gardens */
    private fun getAddress(loc:LatLng): String? {
        val geocoder = Geocoder(activity as MainActivity, Locale.getDefault())
        var addresses: List<Address>? = null
        try {
            addresses = geocoder.getFromLocation(loc.latitude, loc.longitude, 1)
        } catch (e1: IOException) {
            println("Geocoding : problem")
        } catch (e2: IllegalArgumentException) {
            println("Geocoding : Invalid lat lng")
        }
        // If the reverse geocode returned an address
        if (addresses != null) {
            // Get the first address
            val address = addresses[0]
            val addressText = String.format(
                "%s, %s, %s",
                address.getAddressLine(0), // If there's a street address, add it
                address.locality,                 // Locality is usually a city
                address.countryName)              // The country of the address
            return addressText
        }
        else
        {
            println("Geocoding : no address")
            return ""
        }
    }
    // adding markers onLongClick on the map
    private fun setMapLongClick(map: GoogleMap) {
        map.setOnMapLongClickListener { latLng ->
            // A Snippet is Additional text that's displayed below the title.
            val snippet = String.format(
                Locale.getDefault(),
                "Lat: %1$.5f, Long: %2$.5f",
                latLng.latitude,
                latLng.longitude
            )
            map.addMarker(
                MarkerOptions()
                    .position(latLng)
                    .title(getAddress(latLng))
                    .snippet(snippet)
                    .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_GREEN))
            )
        }
    }

    // Use Google Places near me - old version but still works
    @SuppressLint("MissingPermission")
 /*   private fun getCurrentPlaceLikelihoods() {
        // Use fields to define the data types to return.
        val placeFields = listOf(
            Place.Field.DISPLAY_NAME, Place.Field.FORMATTED_ADDRESS,
            Place.Field.LOCATION
        )

        // Get the likely places - that is, the businesses and other points of interest that
        // are the best match for the device's current location.
        val request = FindCurrentPlaceRequest.builder(placeFields).build()
        val placeResponse: Task<FindCurrentPlaceResponse> =
            mPlacesClient.findCurrentPlace(request)
        placeResponse.addOnCompleteListener(activity as MainActivity
        ) { task ->
            if (task.isSuccessful) {
                val response = task.result
                // The first place in the list is the most prominent
                println("${response.placeLikelihoods[0].place.displayName} at ${response.placeLikelihoods[0].place.formattedAddress}")

                // Set the count, handling cases where less than 5 entries are returned.
                val count: Int = if (response.placeLikelihoods.size < maxEntries) {
                    response.placeLikelihoods.size
                } else {
                    maxEntries
                }
                println("Found a place")
                println("count: $count")
                println("${response.placeLikelihoods}")
            } else {
                val exception: Exception? = task.getException()
                if (exception is ApiException) {
                    println("Places : Place not found: ")
                }
            }
        }
    }
    */

    // use google places - new version using the Places API (New)
    private fun findNearbyPlaces() {
        fusedLocationClient.lastLocation.addOnSuccessListener { location: Location? ->
            if (location != null) {
                // Location was found successfully. Now use it to search for nearby places.
                searchWithLocation(location)
            } else {
                // Handle the case where location is null. This can happen if the device's
                // location is turned off or has not yet been determined.
                Log.e("Places", "Could not get device location.")
            }
        }
    }
    // Assuming mPlacesClient is your initialized PlacesClient instance
    fun searchWithLocation(location: Location) {
        println("searching at location: $location" )
        // 1. Define the fields you want to get for each place
        val placeFields = listOf(Place.Field.DISPLAY_NAME, Place.Field.FORMATTED_ADDRESS, Place.Field.LOCATION)
        // 2. Build the SearchNearbyRequest object

        // Location restriction requires a location and a bounding box
        // Define the radius for your search area in meters (must be a Double)
        val radiusInMeters: Double = 10000.0 // 10 kilometer

        // Create the LocationRestriction using CircularBounds.newInstance()
        val circularBounds: LocationRestriction =
            CircularBounds.newInstance(LatLng(location.latitude,location.longitude), radiusInMeters)

        val searchNearbyRequest = SearchNearbyRequest.builder(
            // Argument 1: The center of the search (as a LatLng)
            circularBounds, // The user's current location (converted to LatLng).
            // Argument 2: The radius of the search circle in meters (as a Double)
            placeFields
        )
        .setMaxResultCount(10) // Optional: Limit the number of results.
        .build()

        // 3. Call the searchNearby method
        val placeResponse = mPlacesClient.searchNearby(searchNearbyRequest)

        // 4. Add listeners to handle the result
        placeResponse.addOnSuccessListener { response ->
            val places = response.places
            println("Found ${places.size} places.")

            // The first place in the list is the most prominent
            if (places.isNotEmpty()) {
                val mostLikelyPlace = places.first()
                println("Most likely place: ${mostLikelyPlace.displayName} at ${mostLikelyPlace.formattedAddress}")
            }

            // You can iterate through the whole list
            for (place in places) {
                println("Places in order: " + "Place: ${place.displayName}, Address: ${place.formattedAddress}")
            }
        }

        placeResponse.addOnFailureListener { exception ->
            println("Nearby search failed" + exception)
        }
    }

}