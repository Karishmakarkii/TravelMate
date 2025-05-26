package com.travelmate

import android.content.Intent
import androidx.test.core.app.ActivityScenario.launch
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.Espresso.onData
import androidx.test.espresso.action.ViewActions.click
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.intent.Intents
import androidx.test.espresso.intent.matcher.IntentMatchers.hasAction
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.LargeTest
import org.hamcrest.Matchers.*
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
@LargeTest
class UITests {

    @Before
    fun setup() {
        Intents.init()
        launch(MainActivity::class.java)
    }

    @After
    fun tearDown() {
        Intents.release()
    }

    @Test
    fun testNavigateToSavedTrips() {
        onView(withId(R.id.savedTripsButton)).perform(click())
        onView(withId(R.id.savedTripsList)).check(matches(isDisplayed()))
    }

    @Test
    fun testCheckboxSelection() {
        onView(withId(R.id.checkboxAttraction1)).perform(click())
        onView(withId(R.id.checkboxAttraction1)).check(matches(isChecked()))
    }

    @Test
    fun testChangeRadiusDropdown() {
        onView(withId(R.id.settingsButton)).perform(click())
        onView(withId(R.id.radiusDropdown)).perform(click())
        onData(allOf(`is`(instanceOf(String::class.java)), `is`("10 km"))).perform(click())
        onView(withId(R.id.radiusDropdown)).check(matches(withSpinnerText(containsString("10 km"))))
    }

    @Test
    fun testDeleteAccountModalAppears() {
        onView(withId(R.id.settingsButton)).perform(click())
        onView(withId(R.id.deleteAccountButton)).perform(click())
        onView(withText("Confirm Deletion")).check(matches(isDisplayed()))
    }

    @Test
    fun testMapIntentOpensGoogleMaps() {
        onView(withId(R.id.mapButton)).perform(click())
        intended(hasAction(Intent.ACTION_VIEW))
    }
}
