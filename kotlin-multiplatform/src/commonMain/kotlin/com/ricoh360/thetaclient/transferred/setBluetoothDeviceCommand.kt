/*
 * [camera._set_bluetooth_device.md](https://github.com/ricohapi/theta-api-specs/blob/main/theta-web-api-v2.1/commands/camera._set_bluetooth_device.md)
 */
package com.ricoh360.thetaclient.transferred

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

/**
 * set bluetooth device request
 */
@Serializable
data class SetBluetoothDeviceRequest(
    override val name: String = "camera._setBluetoothDevice",
    override val parameters: SetBluetoothDeviceParams,
) : CommandApiRequest

/**
 * set bluetooth device parameters
 */
@Serializable
data class SetBluetoothDeviceParams(
    /**
     * UUID of the BLE device to set.
     */
    val uuid: String,
)

/**
 * set bluetooth device response
 */
@Serializable
data class SetBluetoothDeviceResponse(
    /**
     * Executed command
     */
    override val name: String,

    /**
     * Command execution status
     * @see CommandState
     */
    override val state: CommandState,

    /**
     * Command ID used to check the execution status with
     * Commands/Status
     */
    override val id: String? = null,

    /**
     * Results when each command is successfully executed.  This
     * output occurs in state "done"
     */
    override val results: ResultSetBluetoothDevice? = null,

    /**
     * Error information (See Errors for details).  This output occurs
     * in state "error"
     */
    override val error: CommandError? = null,

    /**
     * Progress information.  This output occurs in state
     * "inProgress"
     */
    override val progress: CommandProgress? = null,
) : CommandApiResponse

/**
 * set bluetooth device results
 */
@Serializable
data class ResultSetBluetoothDevice(
    /**
     * Device name is generated from the serial number (S/N) of the camera
     */
    val deviceName: String,
)
