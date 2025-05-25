package com.travemate  // ✅ Update to match your package name

import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.espresso.assertion.ViewAssertions.matches
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import com.travemate.MainActivity


@RunWith(AndroidJUnit4::class)
class AppFlowTest {

    @get:Rule
    val activityRule = ActivityTestRule(MainActivity::class.java)

    @Test
    fun testHomeToAttractionsFlow() {
        Thread.sleep(3000)
        onView(withContentDescription("findPlacesButton")).perform(click())
    }

    @Test
    fun testSelectLocationsAndCreateItinerary() {
        Thread.sleep(3000)
        onView(withContentDescription("checkbox-<placeId>")).perform(click())
        onView(withContentDescription("createItineraryButton")).perform(click())
    }

    @Test
    fun testItinerarySummaryAndActions() {
        Thread.sleep(3000)
        onView(withContentDescription("openInMapsButton")).perform(click())
        Thread.sleep(1000)
        onView(withContentDescription("saveTripButton")).perform(click())
    }

    @Test
    fun testTripSavedModalActions() {
        Thread.sleep(2000)
        onView(withContentDescription("modalViewTripButton")).perform(click())
    }

    @Test
    fun testSavedTripOptions() {
        Thread.sleep(3000)
        onView(withContentDescription("openButton-<tripId>")).perform(click())
        onView(isRoot()).perform(pressBack())

        Thread.sleep(1000)
        onView(withContentDescription("mapButton-<tripId>")).perform(click())
        onView(isRoot()).perform(pressBack())

        Thread.sleep(1000)
        onView(withContentDescription("removeButton-<tripId>")).perform(click())
    }
}
