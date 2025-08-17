using ScavengerHunt2.ServiceModel;
using ServiceStack;
using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;

namespace ScavengerHunt.ServiceModel;

#region Base definition

[Icon(Svg = Icons.Cache)]
public class Cache : AuditBase
{
    [AutoIncrement]
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string LocationDescription {  get; set; } = string.Empty;
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public int BasePoints { get; set; }
    public int BountyPoints { get; set; }
    public bool IsEnabled { get; set; }
    public Guid? QRCodeId { get; set; }

    [Reference]
    public List<CacheFinding> Findings { get; set; } = [];
}

#endregion

#region Interactions

[Tag("Caches"), Description("Find Caches")]
[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditQuery)]
public class QueryCaches : QueryDb<Cache> { }

[Tag("Caches"), Description("Create a new Cache")]
[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditCreate)]
public class CreateCache : ICreateDb<Cache>, IReturn<IdResponse>
{
    [ValidateGreaterThanOrEqual(3)]
    public string Name { get; set; } = string.Empty;

    [ValidateGreaterThanOrEqual(10)]
    public string LocationDescription { get; set; } = string.Empty;

    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }

    [ValidateGreaterThan(0)]
    public int BasePoints { get; set; }
    
    [ValidateGreaterThan(0)]
    public int BountyPoints { get; set; }

    public bool IsEnabled { get; set; }
    public Guid? QRCodeId { get; set; }
}

[Tag("Caches"), Description("Update an existing Cache")]
[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditModify)]
public class UpdateCache : IPatchDb<Cache>, IReturn<IdResponse>
{
    public long Id { get; set; }

    [ValidateGreaterThanOrEqual(3)]
    public string Name { get; set; } = string.Empty;

    [ValidateGreaterThanOrEqual(10)]
    public string LocationDescription { get; set; } = string.Empty;

    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }

    [ValidateGreaterThan(0)]
    public int BasePoints { get; set; }

    [ValidateGreaterThan(0)]
    public int BountyPoints { get; set; }

    public bool IsEnabled { get; set; }
    public Guid? QRCodeId { get; set; }
}

[Tag("Caches"), Description("Delete a Cache")]
[ValidateHasRole(Roles.Admin)]
[AutoApply(Behavior.AuditSoftDelete)]
public class DeleteCache : IDeleteDb<Cache>, IReturnVoid
{
    public long Id { get; set; }
}

#endregion