package com.ricoh360.thetaclient.repository

import com.goncalossilva.resources.Resource
import com.ricoh360.thetaclient.MockApiClient
import com.ricoh360.thetaclient.ThetaRepository
import com.ricoh360.thetaclient.transferred.SetBluetoothDeviceRequest
import io.ktor.client.network.sockets.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.utils.io.*
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import kotlin.test.*

@OptIn(ExperimentalSerializationApi::class, ExperimentalCoroutinesApi::class)
class SetBluetoothDeviceTest {
    private val endpoint = "http://192.168.1.1:80/"

    @BeforeTest
    fun setup() {
        MockApiClient.status = HttpStatusCode.OK
    }

    @AfterTest
    fun teardown() {
        MockApiClient.status = HttpStatusCode.OK
    }

    @OptIn(ExperimentalSerializationApi::class)
    private fun checkRequest(request: HttpRequestData, uuid: String) {
        assertEquals(request.url.encodedPath, "/osc/commands/execute", "request path")
        val body = request.body as TextContent
        val js = Json {
            encodeDefaults = true // Encode properties with default value.
            explicitNulls = false // Don't encode properties with null value.
            ignoreUnknownKeys = true // Ignore unknown keys on decode.
        }
        val setBluetoothDevice = js.decodeFromString<SetBluetoothDeviceRequest>(body.text)

        // check
        assertEquals(setBluetoothDevice.name, "camera._setBluetoothDevice", "command name")
        assertEquals(setBluetoothDevice.parameters.uuid, uuid, "uuid")
    }

    /**
     * call setBluetoothDevice.
     */
    @Test
    fun setBluetoothDeviceTest() = runTest {
        val uuid = "00000000-0000-0000-0000-000000000000"
        MockApiClient.onRequest = { request ->
            // check request
            checkRequest(request, uuid)

            ByteReadChannel(Resource("src/commonTest/resources/setBluetoothDevice/set_bluetooth_device_done.json").readText())
        }

        val thetaRepository = ThetaRepository(endpoint)
        thetaRepository.setBluetoothDevice(uuid)
        assertTrue(true, "call setBluetoothDevice")
    }

    /**
     * Error not json response to setBluetoothDevice call
     */
    @Test
    fun setBluetoothDeviceNotJsonResponseTest() = runTest {
        MockApiClient.onRequest = { _ ->
            ByteReadChannel("Not json")
        }

        val thetaRepository = ThetaRepository(endpoint)
        try {
            val uuid = "uuid_test"
            thetaRepository.setBluetoothDevice(uuid)
            assertTrue(false, "response is normal.")
        } catch (e: ThetaRepository.ThetaWebApiException) {
            assertTrue(
                e.message!!.indexOf("json", 0, true) >= 0 ||
                        e.message!!.indexOf("Illegal", 0, true) >= 0,
                "error response"
            )
        }
    }

    /**
     * Error response to setBluetoothDevice call
     */
    @Test
    fun setBluetoothDeviceErrorResponseTest() = runTest {
        MockApiClient.onRequest = { _ ->
            ByteReadChannel(Resource("src/commonTest/resources/setBluetoothDevice/set_bluetooth_device_error.json").readText())
        }

        val thetaRepository = ThetaRepository(endpoint)
        try {
            val uuid = "uuid_test"
            thetaRepository.setBluetoothDevice(uuid)
            assertTrue(false, "response is normal.")
        } catch (e: ThetaRepository.ThetaWebApiException) {
            println(e.message)
            assertTrue(e.message!!.indexOf("UnitTest", 0, true) >= 0, "error response")
        }
    }

    /**
     * Error response and status error to setBluetoothDevice call
     */
    @Test
    fun  setBluetoothDeviceErrorResponseAndStatusErrorTest() = runTest {
        MockApiClient.onRequest = { _ ->
            MockApiClient.status = HttpStatusCode.ServiceUnavailable
            ByteReadChannel(Resource("src/commonTest/resources/setBluetoothDevice/set_bluetooth_device_error.json").readText())
        }

        val thetaRepository = ThetaRepository(endpoint)
        try {
            val uuid = "uuid_test"
            thetaRepository.setBluetoothDevice(uuid)
            assertTrue(false, "response is normal.")
        } catch (e: ThetaRepository.ThetaWebApiException) {
            println(e.message)
            assertTrue(e.message!!.indexOf("UnitTest", 0, true) >= 0, "error response")
        }
    }


    /**
     * Status error to setBluetoothDevice call
     */
    @Test
    fun setBluetoothDeviceStatusErrorTest() = runTest {
        MockApiClient.onRequest = { _ ->
            MockApiClient.status = HttpStatusCode.ServiceUnavailable
            ByteReadChannel("Not json")
        }

        val thetaRepository = ThetaRepository(endpoint)
        try {
            val uuid = "uuid_test"
            thetaRepository.setBluetoothDevice(uuid)
            assertTrue(false, "response is normal.")
        } catch (e: ThetaRepository.ThetaWebApiException) {
            assertTrue(e.message!!.indexOf("503", 0, true) >= 0, "status error")
        }
    }

    /**
     * Error exception to setBluetoothDevice call
     */
    @Test
    fun setBluetoothDeviceExceptionTest() = runTest {
        MockApiClient.onRequest = { _ ->
            throw ConnectTimeoutException("timeout")
        }

        val thetaRepository = ThetaRepository(endpoint)
        try {
            val uuid = "uuid_test"
            thetaRepository.setBluetoothDevice(uuid)
            assertTrue(false, "response is normal.")
        } catch (e: ThetaRepository.NotConnectedException) {
            assertTrue(e.message!!.indexOf("time", 0, true) >= 0, "timeout exception")
        }
    }
}