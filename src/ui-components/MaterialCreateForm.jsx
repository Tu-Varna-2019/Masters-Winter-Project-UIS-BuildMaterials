/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { listMaterialTypes } from "../graphql/queries";
import { createMaterial } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function MaterialCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    quantityAvailable: "",
    price: "",
    materialtypeID: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [quantityAvailable, setQuantityAvailable] = React.useState(
    initialValues.quantityAvailable
  );
  const [price, setPrice] = React.useState(initialValues.price);
  const [materialtypeID, setMaterialtypeID] = React.useState(
    initialValues.materialtypeID
  );
  const [materialtypeIDLoading, setMaterialtypeIDLoading] =
    React.useState(false);
  const [materialtypeIDRecords, setMaterialtypeIDRecords] = React.useState([]);
  const [selectedMaterialtypeIDRecords, setSelectedMaterialtypeIDRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setQuantityAvailable(initialValues.quantityAvailable);
    setPrice(initialValues.price);
    setMaterialtypeID(initialValues.materialtypeID);
    setCurrentMaterialtypeIDValue(undefined);
    setCurrentMaterialtypeIDDisplayValue("");
    setErrors({});
  };
  const [
    currentMaterialtypeIDDisplayValue,
    setCurrentMaterialtypeIDDisplayValue,
  ] = React.useState("");
  const [currentMaterialtypeIDValue, setCurrentMaterialtypeIDValue] =
    React.useState(undefined);
  const materialtypeIDRef = React.createRef();
  const getDisplayValue = {
    materialtypeID: (r) => `${r?.name}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    quantityAvailable: [
      {
        type: "GreaterThanNum",
        numValues: [0],
        validationMessage: "The value must be greater than 0",
      },
    ],
    price: [
      {
        type: "GreaterThanNum",
        numValues: [0],
        validationMessage: "The value must be greater than 0",
      },
    ],
    materialtypeID: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const fetchMaterialtypeIDRecords = async (value) => {
    setMaterialtypeIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: { or: [{ name: { contains: value } }] },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listMaterialTypes.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMaterialTypes?.items;
      var loaded = result.filter((item) => materialtypeID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMaterialtypeIDRecords(newOptions.slice(0, autocompleteLength));
    setMaterialtypeIDLoading(false);
  };
  React.useEffect(() => {
    fetchMaterialtypeIDRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          quantityAvailable,
          price,
          materialtypeID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createMaterial.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MaterialCreateForm")}
      {...rest}
    >
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Name</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              quantityAvailable,
              price,
              materialtypeID,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Quantity available"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={quantityAvailable}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              quantityAvailable: value,
              price,
              materialtypeID,
            };
            const result = onChange(modelFields);
            value = result?.quantityAvailable ?? value;
          }
          if (errors.quantityAvailable?.hasError) {
            runValidationTasks("quantityAvailable", value);
          }
          setQuantityAvailable(value);
        }}
        onBlur={() =>
          runValidationTasks("quantityAvailable", quantityAvailable)
        }
        errorMessage={errors.quantityAvailable?.errorMessage}
        hasError={errors.quantityAvailable?.hasError}
        {...getOverrideProps(overrides, "quantityAvailable")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              quantityAvailable,
              price: value,
              materialtypeID,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              quantityAvailable,
              price,
              materialtypeID: value,
            };
            const result = onChange(modelFields);
            value = result?.materialtypeID ?? value;
          }
          setMaterialtypeID(value);
          setCurrentMaterialtypeIDValue(undefined);
        }}
        currentFieldValue={currentMaterialtypeIDValue}
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Materialtype id</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        items={materialtypeID ? [materialtypeID] : []}
        hasError={errors?.materialtypeID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("materialtypeID", currentMaterialtypeIDValue)
        }
        errorMessage={errors?.materialtypeID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.materialtypeID(
                materialtypeIDRecords.find((r) => r.id === value) ??
                  selectedMaterialtypeIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentMaterialtypeIDDisplayValue(
            value
              ? getDisplayValue.materialtypeID(
                  materialtypeIDRecords.find((r) => r.id === value) ??
                    selectedMaterialtypeIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentMaterialtypeIDValue(value);
          const selectedRecord = materialtypeIDRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedMaterialtypeIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={materialtypeIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label={
            <span style={{ display: "inline-flex" }}>
              <span>Materialtype id</span>
              <span style={{ color: "red" }}>*</span>
            </span>
          }
          isRequired={true}
          isReadOnly={false}
          placeholder="Search MaterialType"
          value={currentMaterialtypeIDDisplayValue}
          options={materialtypeIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.materialtypeID?.(r),
            }))}
          isLoading={materialtypeIDLoading}
          onSelect={({ id, label }) => {
            setCurrentMaterialtypeIDValue(id);
            setCurrentMaterialtypeIDDisplayValue(label);
            runValidationTasks("materialtypeID", label);
          }}
          onClear={() => {
            setCurrentMaterialtypeIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchMaterialtypeIDRecords(value);
            if (errors.materialtypeID?.hasError) {
              runValidationTasks("materialtypeID", value);
            }
            setCurrentMaterialtypeIDDisplayValue(value);
            setCurrentMaterialtypeIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("materialtypeID", currentMaterialtypeIDValue)
          }
          errorMessage={errors.materialtypeID?.errorMessage}
          hasError={errors.materialtypeID?.hasError}
          ref={materialtypeIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "materialtypeID")}
        ></Autocomplete>
      </ArrayField>
      <Divider
        orientation="horizontal"
        {...getOverrideProps(overrides, "SectionalElement0")}
      ></Divider>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
